import { useState, useEffect } from 'react';
import PizzaList from './Pizzalist';

const term = 'Pizza';
const API_URL = '/pizzas';
const headers = {
    'Content-Type': 'application/json'
};

function Pizza() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => fetchPizzaData(), []);

    const fetchData = ({ url, method, body }) =>
        fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        });

    const fetchPizzaData = () => {
        fetchData({
            url: API_URL,
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => setError(error));
    };

    const handleCreate = (item) => {
        fetchData({
            url: API_URL,
            method: 'POST',
            body: { name: item.name, description: item.description }
        })
            .then(response => response.json())
            .then(returnedItem => setData([...data, returnedItem]))
            .catch(error => setError(error));
    };

    const handleUpdate = (updatedItem) => {
        fetchData({
            url: API_URL,
            method: 'PUT',
            body: updatedItem
        })
            .then(() => setData(data.map(item => item.id === updatedItem.id ? updatedItem : item)))
            .catch(error => setError(error));
    };

    const handleDelete = (id) => {
        fetchData({
            url: `${API_URL}/${id}`,
            method: 'DELETE'
        })
            .then(() => setData(data.filter(item => item.id !== id)))
            .catch(error => setError(error));
    };

    return (
        <div>
            <PizzaList
                name={term}
                data={data}
                error={error}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default Pizza;