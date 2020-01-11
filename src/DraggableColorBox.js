import React from 'react';
import { height, width, flexbox } from '@material-ui/system';
import { Delete } from '@material-ui/icons'
import { SortableElement } from 'react-sortable-hoc';
import useStyles from './styles/DraggableColorBoxStyles';

const DraggableColorBox = SortableElement((props) => {
    const classes = useStyles(props);
    const { handleClick, name, color } = props;
    return (
        <div
            className={classes.root}
            style={{ backgroundColor: color }}
        >
            <div className={classes.boxContent}>
                <span>{name}</span>
                <Delete className={classes.deleteIcon} onClick={handleClick} />
            </div>
        </div>
    );

})

export default DraggableColorBox;