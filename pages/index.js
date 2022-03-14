import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import { getStoredPostsData } from '../lib/postsComiler';
import utils from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/Date';

export default function Home({ allPostsData }) {
   return (
      <Layout home>
         <Head>
            <title>{siteTitle}</title>
         </Head>
         <section className={utils.headingMd}>
            <p>
               Hello everybody, I'm Roman, beginning frontend developer! I like
               React and NextJS, JavaScript coding is very fun!
            </p>
            <p>
               This is simple web site, builded with Next JS, during tutorial
               learning course
               <a
                  href="https://nextjs.org/learn"
                  target="_blank"
                  rel="noopener noreferrer"
               ></a>
            </p>
         </section>
         <section className={`${utils.headingMd} ${utils.padding1px}`}>
            <h2 className={utils.headingLg}>Blog</h2>
            <ul className={utils.list}>
               {allPostsData.map(({ id, date, title }) => (
                  <li className={utils.listItem} key={id}>
                     <Link href={`/posts/${id}`}>
                        <a>{title}</a>
                     </Link>
                     <br />
                     <small className={utils.lightText}>
                        <Date dateString={date} />
                     </small>
                  </li>
               ))}
            </ul>
         </section>
      </Layout>
   );
}

export async function getStaticProps() {
   const allPostsData = getStoredPostsData();
   return {
      props: {
         allPostsData,
      },
   };
}
