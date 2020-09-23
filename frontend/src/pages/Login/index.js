import React, {useState} from 'react';
import api from '../../servers/api';

export default function Login( { history } ){
    const [ email, setEmail ] = useState('');
    async function handleSubmit(event){
        event.preventDefault();
        const response = await api.post('/sessions', { email });
        const {_id} = response.data;
        localStorage.setItem('user', _id);
        history.push('/dashboard');
    }
    return (
        <>
            <p>Ofereça <strong>Spots</strong> para Programadores e encontre <strong>Talentos</strong> para sua Empresa</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail *</label>
                <input 
                type="email" 
                id="email" 
                placeholder="Seu melhor E-mail" 
                onChange={event => setEmail(event.target.value)} 
                value={email}
                />
                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}