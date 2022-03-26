import fs from "fs/promises";
import path from "path";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next/types";
import Link from "next/link";
import Head from "next/head";

function Test({ id }) {
  // console.log(props);

  return (
    <>
      <Head>abc</Head>
      <h1>{id}</h1>
      <span>static</span>
      <br />
      <Link href="/test/1">text</Link>
    </>
  );
}

export default Test;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;

  const dataPath = path.join(process.cwd(), "data", "placeholder.json");
  const file = await fs.readFile(dataPath);
  const data = JSON.parse(file.toString());

  const currentObj = data.find((item) => +item.id === +id);

  if (!currentObj) return { notFound: true };

  return { props: { id, current: currentObj } };
};

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { id } = context.params;

//   const dataPath = path.join(process.cwd(), "data", "placeholder.json");
//   const file = await fs.readFile(dataPath);
//   const data = JSON.parse(file.toString());

//   const currentObj = data.find((item) => +item.id === +id);

//   if (!currentObj) return { notFound: true };

//   return { props: { id, current: currentObj } };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const dataPath = path.join(process.cwd(), "data", "placeholder.json");
//   const data = await fs.readFile(dataPath);
//   const json = JSON.parse(data.toString());

//   // console.log("json:", json);
//   const paths = json.map(({ id }: { id: number }) => ({
//     params: {
//       id: id.toString(),
//     },
//   }));
//   // console.log("paths:", paths);

//   // const paths = json.map(({ id }) => {
//   //   params: {
//   //     id;
//   //   }
//   // });

//   // console.log(paths);

//   return {
//     paths,
//     fallback: true,
//   };
// };
