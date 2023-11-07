import { useDispatch} from 'react-redux'
import {reactionAdded} from './postSlice'

const reactionEmoji ={
    thumbUp: '👍',
    wow:'😊',
    heart: '🧡',
    rocket: '🍢',
    coffee:'☕'
} 
const ReactionButton = ({ post }) => {
   const dispatch = useDispatch()
   const reactionButton = Object.entries(reactionEmoji).map(([name,emoji]) => {
    return(
        <button
        key={name}
        type='button'
        className='reactionButton'
        onClick={() => dispatch(reactionAdded({postId: post.id, reaction: name}))}
        > 
        {emoji} {post.reactions[name]}
        </button>
    )
   })
    return( <div>{reactionButton}</div>
    )
}  
export default ReactionButton