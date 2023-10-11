// app/admin/page.js
'use client'
import { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';

function Admin() {

  const [data,setData] = useState([])
  // const token  = window.localStorage.token
  // console.log("token:",token)
  

  useEffect(() => {
    
    // if (!token) {
     
    //   window.location.href = '/login'; // Cambia a tu ruta de login si es diferente
    // }
    const fetchData = async () => {
      try {
        const response = await fetch('api/process-affiliates', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`  // Asumiendo que tu API necesita un token para autenticar
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setData(responseData.affiliates);
      } catch (error) {
        console.error('Hubo un error al obtener los datos:', error);
      }
    };

    fetchData();

  }, []);



  
console.log(data)


  return (
    <main className='flex justify-center items-center w-full h-screen flex-col'>
      <section className='my-10 text-center'>
      Contenido del dashboard administrativo.
      </section>
      <section className = "max-w-[1200px] w-full text-left">
      <Table className='w-full '>
      <Table.Head>
        <Table.HeadCell>
          Email
        </Table.HeadCell>
        <Table.HeadCell>
          Afiliate-ID
        </Table.HeadCell>
        <Table.HeadCell>
          Last Id Generated
        </Table.HeadCell>
        <Table.HeadCell>
          Nº Clics
        </Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">
            Edit
          </span>
        </Table.HeadCell>
      </Table.Head>


      <Table.Body className="divide-y text-left border-none">
    {data.map((e, i) => (
      <Table.Row key={i} className='border-none'>
        <Table.Cell className="whitespace-nowrap font-medium py-2">
          {e.email}
        </Table.Cell>
        <Table.Cell>
          {e.affiliate_id}
        </Table.Cell>
        <Table.Cell>
          Sun-25/06/2023
        </Table.Cell>
        <Table.Cell>
          5
        </Table.Cell>
        <Table.Cell>
          <a
            className="font-medium text-blue-600 hover:underline dark:text-gray-500"
            href="/tables"
          >
            <p>
              Edit
            </p>
          </a>
        </Table.Cell>
        <Table.Cell>
          <a
            className="font-medium text-red-600 hover:underline dark:text-red-500"
            href="/tables"
          >
            <p>
              Delete
            </p>
          </a>
        </Table.Cell>
      </Table.Row>
    ))}
</Table.Body>
    </Table>
      </section>
      
    </main>
  );
}

export default Admin;
