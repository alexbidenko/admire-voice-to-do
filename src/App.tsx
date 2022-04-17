import {Container} from '@sberdevices/plasma-ui/components/Grid';
import {
  Button,
  Card,
  CardContent,
  Cell,
  TextArea,
  TextBoxBigTitle,
  TextBoxTitle,
} from '@sberdevices/plasma-ui';
import React, {useCallback, useEffect, useState} from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Task from './components/Task';
import {IconDone, IconPlus} from '@sberdevices/plasma-icons';
import assistant, {debugSmartData} from './api';

const App = () => {
  const [list, setList] = useState<{ id: number; text: string; completed: boolean }[]>(localStorage.ADMIRE_TASKS ? JSON.parse(localStorage.ADMIRE_TASKS) : []);
  const [text, setText] = useState('');

  const onChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value), []);

  const onDelete = useCallback((id: number) => setList((prev) => prev.filter((el) => el.id !== id)), []);

  const onComplete = useCallback((id: number) => setList((prev) => {
    const item = prev.find((el) => el.id === id);
    if (item) item.completed = true;
    return [...prev];
  }), []);

  const onSubmit = useCallback(() => {
    if (!text) return;

    setList((prev) => [{id: new Date().getTime(), text, completed: false}, ...prev]);
    setText('');
  }, [text]);

  useEffect(() => {
    localStorage.ADMIRE_TASKS = JSON.stringify(list);
  }, [list]);

  useEffect(() => {
    assistant.on('data', (command) => {
      debugSmartData('on data: ', command);
      if (command.type === 'smart_app_data') {
        switch (command.smart_app_data.type) {
          case 'create': {
            const data = command.smart_app_data.data as string;
            setList((prev) => [{id: new Date().getTime(), text: `${data[0].toUpperCase()}${data.slice(1)}`, completed: false}, ...prev]);
            break;
          }
          case 'delete': {
            const index = command.smart_app_data.data as number;
            if (!isNaN(index) && +index >= 1) {
              setList((prev) => prev.filter((_, i) => i !== index - 1));
            }
            break;
          }
          case 'complete': {
            const index = command.smart_app_data.data as number;
            setList((prev) => {
              if (isNaN(index) || +index < 1) return prev;
              prev[index - 1].completed = true;
              return [...prev];
            });
            break;
          }
          default: {
            setList((prev) => [{id: new Date().getTime(), text: JSON.stringify(command.smart_app_data), completed: false}, ...prev]);
          }
        }
      }
    });
  }, []);

  return (
    <Container style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
      <Card style={{marginBottom: '2rem'}}>
        <CardContent compact>
          <Cell
            contentLeft={<IconDone />}
            content={<TextBoxBigTitle>Admire To-Do</TextBoxBigTitle>}
          />
        </CardContent>
      </Card>

      <TextArea
        style={{marginBottom: '2rem'}}
        placeholder="Текст задачи"
        value={text}
        onChange={onChange}
        contentRight={<Button onClick={onSubmit} size="s" contentLeft={<IconPlus />} />}
      />

      <TransitionGroup>
        {list.map((el, index) => (
          <CSSTransition
            key={el.id}
            timeout={500}
            classNames="list-item"
          >
            <Task key={el.id} index={index + 1} onDelete={onDelete} onComplete={onComplete} {...el} />
          </CSSTransition>
        ))}
      </TransitionGroup>
      {!list.length && (
        <Card>
          <CardContent compact>
            <Cell content={<TextBoxTitle>Список задач пустой</TextBoxTitle>} />
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default App;
