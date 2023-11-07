import {useSelector, useDispatch} from 'react-redux'
import {selectAllPost, getPostsStatus, getPostsError, fetchPosts} from './postSlice'
import { useEffect } from 'react'
import PostsExcerpt from './PostsExcerpt'

 const PostList =() => {
     const dispatch = useDispatch()

    const posts = useSelector(selectAllPost)
    const postsStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)
   
    useEffect(() => {
        if(postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch])
   
        let content;
        if(postsStatus === 'loading'){
            content = <p>Loading...</p>
        }else if (postsStatus === 'succeeded') {
            const orderedPosts = posts.slice().sort((a,b) =>b.date.localeCompare(a.date))
            content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post}/>)
            }else if (postsStatus === 'failed') {
                content = <p> {error}</p>
            }

    return (
    <section>
        <h2>Post</h2>
        {content}
    </section>
    )
 }
 export default PostList