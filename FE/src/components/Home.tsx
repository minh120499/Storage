import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
  useQuery,
  useMutation
} from "@tanstack/react-query";
import axios from "axios";

// const queryClient = new QueryClient();
// function Example () {
//   const {data, isLoading, error} = useQuery(["id"], () => axios.get("https://jsonplaceholder.typicode.com/posts"));
// //   console.log(data, isLoading, error);
// // console.log(isLoading, data, error);
// if(!isLoading) {
//     // return data
//     console.log(data);
    
// }


//   return (
//     <div>

//     </div>
//   )
// }

// export default function Home() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Example />
//     </QueryClientProvider>
//   );
// }

export default function Home() {
    
    const que = useQueryClient()
    const fetchGroups = (): Promise<[]> => axios.get('https://jsonplaceholder.typicode.com/posts').then(response => response.data)
    const { data, isFetching, isLoading, error, isError } = useQuery(['id'], fetchGroups)


    if(isLoading) {
        return <div>Loadding...</div>
    }

    if(error) {
        console.log(error);
        
        return <div>Errro</div>
    }

    // data && console.log(data)
    
    
    return (
        <div>ok</div>
    )
}
