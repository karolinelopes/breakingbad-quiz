import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router'; 

import db from '../db.json';
import Widget from '../src/components/Widget';
import Link from '../src/components/Link';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {

  const router = useRouter();
  const [player, setPlayer] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>BreakingBadQuiz</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5}}
          variants={{
            show: { opacity: 1, y: '0'},
            hidden: { opacity: 0, y: '100%'},
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={function (e) {
              e.preventDefault();
              router.push(`/quiz?player=${player}`);
            }}>
            <Input 
              player="namePlayer"
              onChange={(e) => {
                //State
                setPlayer(e.target.value)}}  
                placeholder="Informe o nome do jogador" 
                value={player}/>
              <Button type="submit" disabled={player.length === 0}>{`PLAYER ${player}`}</Button>
              </form>
            
          </Widget.Content>
        </Widget>

        <Widget
        as={motion.section}
        transition={{ delay: 0.5, duration: 0.5}}
        variants={{
          show: { opacity: 1},
          hidden: { opacity: 0},
        }}
        initial="hidden"
        animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            
            <ul>
            {db.external.map((linkExterno) => {
              const [projectName, gitHubUser] = linkExterno
              .replace(/\//g, '')
              .replace('https:', '')
              .replace('.vercel.app', '')
              .split('.');

              return (
              <li key={linkExterno}>
                <Widget.Topic 
                as={Link}
                href={`/quiz/${projectName}___${gitHubUser}`}
                >
                  {`${gitHubUser}/${projectName}`}
                </Widget.Topic>
              </li>
              );
            })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer 
           as={motion.footer}
           transition={{ delay: 0.5, duration: 0.5 }}
           variants={{
             show: { opacity: 1 },
             hidden: { opacity: 0 },
           }}
           initial="hidden"
           animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/karolinelopes" />
    </QuizBackground>
  );
}