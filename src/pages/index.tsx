import Head from 'next/head';
import { Frame } from '../components/Frame';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { signIn, useSession } from "next-auth/react"
import { useEffect } from 'react';

export default function Home({ spaceXCrew }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: sessionData } = useSession();
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      void signIn(); //Add your own provider here
    }
  }, [ sessionStatus ])

  return (
    <>
      <Head>
        <title>Sample App</title>
        <meta name="description" content="Sample App"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Frame spaceXCrew={spaceXCrew}/>
    </>
  );
}

export type SpaceXCrew = {
  id: string;
  name: string;
  agency: string;
  image: string;
  wikipedia: string; // not used
  launches: string[]; // not used
  status: string; // not used
};

export const getServerSideProps: GetServerSideProps<{
  spaceXCrew: SpaceXCrew[];
}> = async () => {
  const spaceXCrewResponse = await fetch('https://api.spacexdata.com/v4/crew');
  const spaceXCrew = (await spaceXCrewResponse.json()) as SpaceXCrew[];

  // crew list comes back in no particular order
  // sort by agency then alphabetically by name
  const crewSorted = spaceXCrew.sort((a, b) => {
    if (a.agency === b.agency) {
      return a.name.localeCompare(b.name);
    } else {
      return a.agency.localeCompare(b.agency);
    }
  });

  return { props: { spaceXCrew: crewSorted } };
};
