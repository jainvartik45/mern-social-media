export default (state = [],action)=>{
    switch (action.type) {
        case 'FETCH_ALL':
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case 'FETCH_BY_SEARCH':
      return { ...state, posts: action.payload.data };
    // case 'FETCH_POST':
    //   return { ...state, post: action.payload.post };
    case 'LIKE':
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case 'COMMENT':
        return {
          ...state,
          posts: state.posts.map((post) => {
            if (post._id == +action.payload._id) {
              return action.payload;
            }
            return post;
          }),
        };
    case 'CREATE':
      return { ...state, posts: [...state.posts, action.payload] };
    case 'UPDATE':
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case 'DELETE':
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    case 'FETCH_POST':
      return  { ...state, post: action.payload };
    default:
      return state;
     
        
    }
}