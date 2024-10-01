'use client'
import { useFetchReview } from '@/hooks/FetchAllProduct'
import { ReviewProp } from '@/models/Products'
import ReviewProps from './ReviewProps'
import Accordion from '../ui/RT'


const ReviewByProduct = ({ params }: { params:string }) => {
    const {rEview} = useFetchReview<ReviewProp[]>(
        `http://localhost:3002/api/reviews/${params}`,
        'review'
    )
    const REvieLen = rEview?.length || 0
  return (
    <div className=''>
        <Accordion title={`All Reviews (${REvieLen})`}>
          {
            rEview?.map((a)=>( 
              <ReviewProps item={a} key={a._id}/>
            ))
          }
        </Accordion>
    </div>
  )
}

export default ReviewByProduct
