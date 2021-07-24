import React, { useState, useEffect } from 'react';

const Table = () => {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: '',
      mail: '',
      lastSeen: '',
    },
  ]);

  //  console.log(tableData);
  //  const [data, setData] = useState({
  //   Accounts: [
  //    {
  //     name: {
  //      validation: "/^[a-z ,.'-]+$/i",
  //      dataFormat: 'First name/ Last name',
  //      dataType: 'text',
  //     },

  //     mail: {
  //      validation:
  //       '/^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,4}))$/,\r\n',
  //      dataFormat: 'local-part@domain',
  //      dataType: 'email',
  //     },
  //     lastSeen: {
  //      validation:
  //       '/^(0?[1-9]|[12][0-9]|3[01])[\\/\\-](0?[1-9]|1[012])[\\/\\-]\\d{4}$/',
  //      dataFormat: 'DD-MM-YYYY',
  //      dataType: 'date',
  //     },
  //    },
  //   ],
  //  });
  const handleChange = ({ target }, itemID) => {
    setTableData(
      tableData.map(
        el =>
          (el.id = itemID
            ? {
                ...el,
                [target.name]: target.value,
              }
            : el),
      ),
    );
    tableData.map(
      el => (el.id = itemID ? console.log('yes') : console.log('no')),
    );
  };
  // 'el:', el, 'ItemID:', itemID
  const getData = () => {
    fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then(myJson => {
        setData(myJson);
        // console.log(myJson);
      });
  };
  useEffect(() => {
    getData();
    setData(getData);
    console.log(data);
  }, []);

  return (
    <div>
      <h1>Accounts</h1>
      <div className="App">
        <table>
          {tableData.map((el, index) => (
            <div>
              <input
                onChange={e => handleChange(e, el.id)}
                name="name"
                placeholder="name"
                type="text"
                value={el.name}
              />
              <input
                onChange={e => handleChange(e, el.id)}
                name="mail"
                placeholder="email"
                type="text"
                value={el.mail}
              />
              <input
                onChange={e => handleChange(e, el.id)}
                name="lastSeen"
                placeholder="date"
                type="text"
                value={el.lastseen}
              />
            </div>
          ))}
          <button
            onClick={() => {
              setTableData([
                ...tableData,
                {
                  id: Math.floor(Math.random() * 10000),
                  name: '',
                  mail: '',
                  lastSeen: '',
                },
              ]);
            }}
          >
            +
          </button>
          {/* <tr>
      <th>Name</th>
      <th>Mail</th>
      <th>Last seen</th>
     </tr> */}
          {/* {tableData.map((el, index) => (
      <tr key={index}>
       <td>{el.name}</td>
       <td>{el.mail}</td>
       <td>{el.lastseen}</td>
      </tr>
     ))} */}
        </table>
      </div>
    </div>
  );
};

export default Table;
