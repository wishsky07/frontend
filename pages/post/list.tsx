import Layout from "../../component/common/Layout";
import {Container} from "react-bootstrap";
import {useSession} from "next-auth/react";
import axios from "axios";



function List() {

    const {data: session, status} = useSession();
    axios.get('/api/get')
        .then(res => {
            console.log(res.data)
        })

    return(
        <Layout>
            <Container>
                <h1 className="text-center mt-4">리스트</h1>
                {session && (
                    <table>
                        <thead>
                        <tr>
                            <th>

                            </th>
                        </tr>
                        </thead>
                    </table>
                    )}
            </Container>
        </Layout>
    )
}
export default List