import React, { useState, useEffect } from 'react';
import './styles.css';
import { Card, CardProps } from '../../components/Card';

type ProfileResponse = {
    name: string;
    avatar_url: string;
}

type User = {
    name: string;
    avatar: string;
  }

export function Home() {
    // O estado tem dois elementos: 1o) studentName -> guarda o conteúdo do estado. 2o) setStudentName -> Função que atualiza o estado.
    const [studentName, setStudentName] = useState('');
    const [students, setStudents] = useState<CardProps[]>([]);
    const [user, setUser] = useState<User>({} as User);

    function handleAddStudent(){
        const newStudent = {
            name: studentName,
            time: new Date().toLocaleTimeString("pt-br",{
                hour: '2-digit',
                minute: '2-digit',
                second:'2-digit',
            })
        };

        // prevState -> O estado anterior será guardado e não substituído. Um novo estudante será acrescentado à lista de presença.
        //...prevState -> Recupera o conteúdo que estava armazenado anteriormente. Cria um novo vetor com o conteúdo que já estava armazenado anteriormente + novo vetor.
        setStudents(prevState => [...prevState, newStudent]);

    }

    useEffect(() => {
        // corpo do useEffect -> São as ações que deverão ser executadas. É executado assim que a interface for renderizada. É automático.
        async function fetchData() {
          const response = await fetch('https://api.github.com/users/irismar-pereira');
          const data = await response.json() as ProfileResponse;
    
          setUser({
            name: data.name,
            avatar: data.avatar_url,
          });
        }
    
        fetchData();
      }, []);
    
    return (
        <div className="container">
            <header>
                <h1>Attendance list</h1>
                
                <div>
                    <strong>{user.name}</strong>
                    <img src={user.avatar} alt="Foto de perfil"/>
                </div>

            </header>

            <input 
            type= "text" 
            placeholder="Digite seu nome ..."
            onChange={e => setStudentName(e.target.value)} 
            />

            <button type="button" onClick={handleAddStudent}>
            Adicionar
            </button>

            {/* Propriedades de cada cartão  */}
            
            {
                students.map(student =>  (
                    <Card
                        key={student.time} // A chave precisa ser única. Poderia ser utilizado um ID.
                        name={student.name} 
                        time={student.time}
                    />
                ))            
            }
                      
        </div>
    )
}

