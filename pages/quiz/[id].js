/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizGaleraPage({ dbExterno }) {
    return (
        <ThemeProvider theme={dbExterno.theme}>
            <QuizScreen externalQuestions={dbExterno.questions}
            externalBg={dbExterno.bg}/>
            </ThemeProvider>
    );
}

export async function getServerSideProps(context) {
    const [projectName, gitHubUser] = context.query.id.split('___'); 
    
    try {
        const dbExterno = await fetch(`https://${projectName}.${gitHubUser}.vercel.app/api/db`)
          .then((respostaDoServer) => {
            if (respostaDoServer.ok) {
              return respostaDoServer.json();
            }
            throw new Error('Falha em pegar os dados');
          })
          .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
        return {
          props: {
            dbExterno,
          },
        };
      } catch(err) {
        throw new Error(err);
      }
}
    