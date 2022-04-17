import React, {memo} from 'react';
import {Button, Card, CardContent, Cell, Checkbox, TextBoxTitle} from '@sberdevices/plasma-ui';
import {IconTrash} from '@sberdevices/plasma-icons';

type TaskProps = {
  index: number;
  id: number;
  text: string;
  completed: boolean;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
};

const Task: React.FC<TaskProps> = ({index, id, text, completed, onComplete, onDelete}) => (
  <Card style={{marginBottom: '1rem'}}>
    <CardContent compact>
      <Cell
        content={<TextBoxTitle style={{whiteSpace: 'pre-wrap'}}>{text}</TextBoxTitle>}
        contentLeft={(
          <>
            <Button style={{marginRight: '1rem'}} size="s" contentLeft={index} />
            <Checkbox style={{marginRight: '0.5rem'}} checked={completed} onChange={() => onComplete(id)} />
          </>
        )}
        contentRight={<Button onClick={() => onDelete(id)} size="s" contentLeft={<IconTrash />} />}
      />
    </CardContent>
  </Card>
);

export default memo(Task);
