import {
  sanityClient,
  urlFor,
  usePreviewSubscription,
  PortableText,
} from '../../lib/sanity'
import { useRouter } from 'next/router'
import Image from 'next/image'
import imageLoader from '../../imageLoader'
const recipesQuery = `*[_type =='recipe' && slug.current==$slug][0]{
 _id,
 name,
 slug,
 mainImage, 
  ingredient[]{
   _key,
   unit,
   wholeNumber,
   fraction,
   ingredient->{
    name
   }
  },
  instructions
}`

export default function OneRecipe({ data }) {
  const { recipe } = data ? data : []
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <article className='container'>
      <h1 className='recipe__title'>{recipe.name}</h1>
      <main className='recipe_detail'>
        {/* <img src={urlFor(recipe.mainImage).url()} alt={recipe.name} /> */}
        <Image
          src={urlFor(recipe.mainImage).url()}
          loader={imageLoader}
          unoptimized
          alt={recipe.name}
          width='1000'
          height='800'
        />
        <div className=''>
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredient?.map((item) => (
              <li key={item._key}>
                <strong>{item.ingredient?.name}</strong> {item?.wholeNumber}{' '}
                {item?.fraction} {item?.unit}{' '}
              </li>
            ))}
          </ul>
        </div>
        <div className=''>
          <h3>instructions:</h3>
          <PortableText blocks={recipe?.instructions} />
        </div>
      </main>
    </article>
  )
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type=='recipe' && defined(slug.current)]{
   "params":{
    "slug": slug.current
   }
  }`
  )
  return {
    paths,
    fallback: true,
  }
}
export async function getStaticProps({ params }) {
  const { slug } = params
  const recipe = await sanityClient.fetch(recipesQuery, { slug })
  return {
    props: { data: { recipe } }, // will be passed to the page component as props
    revalidate: 10,
  }
}
