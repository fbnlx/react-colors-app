import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import "emoji-mart/css/emoji-mart.css";

export default function PaletteMetaForm(props) {
    const [open, setOpen] = React.useState(props.open);
    const [emojiOpen, setEmojiOpen] = React.useState(false);
    const [newPaletteName, setNewPaletteName] = React.useState("");

    const handleChange = (evt) => {
        setNewPaletteName(evt.target.value);
    };

    React.useEffect(() => {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
            props.palettes.every(({ paletteName }) => paletteName.trim().toLowerCase() !== newPaletteName.trim().toLowerCase()));
    });

    React.useEffect(() => {
        setOpen(props.open);
    }, [props.open])

    const showEmojiPicker = () => {
        setEmojiOpen(true);
    };

    const savePalette = (emoji) => {
        const newPalette = {
            "paletteName": newPaletteName,
            "emoji": emoji.native
        }
        props.handleSubmit(newPalette);
        setEmojiOpen(false);
    };

    const closeEmoji = () => {
        setEmojiOpen(false);
    }

    return (
        <div>
            <Dialog open={emojiOpen} onClose={closeEmoji}>
                <DialogTitle>
                    Choose a palette emoji
                </DialogTitle>
                <Picker title="Pick a palette emoji" onSelect={savePalette} />
            </Dialog>
            <Dialog open={open} onClose={props.hideForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={() => showEmojiPicker()}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your new beautiful palette. Make sure it's unique.
                    </DialogContentText>
                        <TextValidator
                            label="Palette Name"
                            value={newPaletteName}
                            name="newPaletteName"
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter Palette Name", "Palette name already exists"]}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.hideForm} color="primary">
                            Cancel
                    </Button>
                        <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}