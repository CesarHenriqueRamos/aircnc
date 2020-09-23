import React, { useState, useMemo } from 'react';
import api from '../../servers/api';
import img from '../../assets/camera.svg';
import './style.css';

export default function New({ history }){
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [price, setPrice] = useState('');
    const [techs, setTechs] = useState(''); 
    
    const preview = useMemo(()=>{
        return thumbnail ? URL.createObjectURL(thumbnail) : null ;
    },[thumbnail])

    async function handleSubmit(event){
       event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail',thumbnail);
        data.append('company', company);
        data.append('price',price);
        data.append('techs',techs);
        console.log(data)
        console.log(user_id);
       const res = await api.post('/spots', data, {
            headers: { user_id }
        }) 
        console.log(res);
        history.push('/dashboard');
    }
    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" 
            style={{backgroundImage: `url(${preview})`}}
            className={thumbnail? 'has-thumbnail': ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={img} alt="Select Img" />
            </label>
            <label htmlFor="company">Empresa *</label>
            <input  id="company"
                    placeholder="Sua Incrivel Empresa"
                    value={company}
                    onChange= {event=> setCompany(event.target.value)} />
            <label htmlFor="techs">Tecnologisa * <span>(Separadas por virgula)</span></label>
            <input  id="techs"
                    placeholder="Quais Tecnologias Usam?"
                    value={techs}
                    onChange= {event=> setTechs(event.target.value)} />
            <label htmlFor="price">Valor da Diaria * <span>(Em branco para Gratuito)</span></label>
            <input  id="price"
                    placeholder="Valor cobrado por Dia"
                    value={price}
                    onChange= {event=> setPrice(event.target.value)} />
            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}