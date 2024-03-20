import BookList from '@/components/BookList'
import Text from '@/components/shared/Text'
import { RANKING_URL } from '@/constants/api'
import { BookType } from '@/interface'

export default async function HomePage() {
  const { Items: rankData }: { Items: BookType[] } = await getRankData()
  const { category } = await getCategoryData()
  return (
    <>
      <Text>text</Text>

      {/* <BookRankingList books={rankData} /> */}
      <BookList category={category} />
    </>
  )
}

export async function getCategoryData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export async function getRankData() {
  try {
    const res = await fetch(RANKING_URL, {
      cache: 'no-store',
    })
    return res.json()
  } catch (error) {
    console.error('Error fetching ranking:', error)
    throw new Error('Failed to fetch ranking from Rakuten API')
  }
}
