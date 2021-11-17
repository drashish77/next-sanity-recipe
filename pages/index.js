import Head from 'next/head'
import Link from 'next/link'
import { sanityClient, urlFor } from '../lib/sanity'

const recipesQuery = `*[_type=='recipe']{
  _id, 
  name, 
  slug,
  mainImage
}`

export default function Home({ recipes }) {
  // const imgSrc = recipes.mainImage
  return (
    <div className='container'>
      <Head>
        <title>Alex Kitchen</title>
        <meta name='description' content='This is a online juice center' />
        <link rel='icon' href='/chef.png' />
      </Head>
      <h1>Welcome to Alex's kitchen</h1>

      <ul className='recipes-list'>
        {recipes?.length > 0 &&
          recipes.map((recipe) => (
            <li key={recipe._id} className='recipes-card'>
              <Link href={`/recipes/${recipe.slug.current}`}>
                <a>
                  <img src={urlFor(recipe.mainImage).url()} alt='' />
                  <span>{recipe.name}</span>
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const recipes = await sanityClient.fetch(recipesQuery)
  return {
    props: { recipes },
  }
}
