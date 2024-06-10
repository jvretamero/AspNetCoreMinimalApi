import { useState } from 'react';
import { TextField, Button, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

function PizzaList({
    name,
    data,
    onCreate,
    onUpdate,
    onDelete,
    error
}) {
    const [formData, setFormData] = useState({ id: '', name: '', description: '' });
    const [editingId, setEditingId] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (editingId) {
            onUpdate(formData);
            setEditingId(null);
        } else {
            onCreate(formData);
        }

        setFormData({ id: '', name: '', description: '' });
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setFormData(previousData => ({
            ...previousData,
            [name]: value
        }));
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({
            id: item.id,
            name: item.name,
            description: item.description,
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({ id: '', name: '', description: '' });
    };

    return (
        <Box className="Box" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>{editingId ? 'Edit' : 'New'} {name}</h2>
            <form onSubmit={handleSubmit}>
                <div sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <TextField
                        name="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleFormChange} />

                    <TextField
                        name="description"
                        label="Description"
                        value={formData.description}
                        onChange={handleFormChange} />
                </div>

                <div sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Button type="submit" variant="contained" sx={{ mr: 1 }}>{editingId ? 'Update' : 'Create'}</Button>

                    {editingId && <Button type="button" variant="contained" color="secondary" onClick={handleCancelEdit}>Cancel</Button>}
                </div>
            </form>

            {error && <p>{error}</p>}

            <h2>{name}s</h2>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                {data.map(item => (
                    <ListItem key={item.id} secondaryAction={
                        <>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item)}>
                                <Edit />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item.id)}>
                                <Delete />
                            </IconButton>
                        </>
                    }>
                        <ListItemText primary={item.name} secondary={item.description} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default PizzaList;