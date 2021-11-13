import React, { useEffect, useState } from 'react'
import { Card, Form, Table } from 'react-bootstrap';
import { getCountries, getDatabyCountry } from '../data/apiData';
import { ExportCSV } from './ExportData';

import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";

function HomeScreen() {

    const [countries, setCountries] = useState([]);
    const [exportData, setExportData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fileName = 'CovidData'

    const override = css`
    display: block;
    display:flex;
    justify-content: center;
    align-items: center;
    border-color: red;
  `;

    const getAllCountries = async () => {
        const data = await getCountries();
        setCountries(data)
    }

    const onChangeHandle = async e => {
        setExportData([])
        setLoading(true)
        const data = await getDatabyCountry(e.target.value);
        setExportData(data);
        setLoading(false)
    }

    useEffect(() => {
        getAllCountries();
    }, [])

    return (
        <div className='container'>
            <Card>
                <Card.Body>
                    <Card.Title>Excel Export</Card.Title>
                    <Form>
                        <Form.Label className='text-danger font-weight-bold'>Select Country</Form.Label>
                        <Form.Control as='select' onChange={(e) => onChangeHandle(e)} placeholder="choose...">
                            {
                                countries.map((country, i) =>
                                    <option key={i} value={country.name}>{country.name}</option>
                                )
                            }
                        </Form.Control>
                    </Form>
                    {exportData.length !== 0 ? (
                        <ExportCSV csvData={exportData} fileName={fileName} />
                    ) : null}
                    <Table responsive>
                        <thead className='stickyHeader'>
                            <tr>
                                <th className='stickyHeader'>Province State</th>
                                <th className='stickyHeader'>Country</th>
                                <th className='stickyHeader'>Confirmed</th>
                                <th className='stickyHeader'>Deaths</th>
                                <th className='stickyHeader'>Active</th>
                                <th className='stickyHeader'>Incident Rate</th>
                                <th className='stickyHeader'>Latitude</th>
                                <th>Longitude</th>
                                <th>Last Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                exportData.length === 0 ? (
                                    <tr>
                                        <td colSpan='10'>{<BeatLoader color={"red"} loading={loading} css={override} size={25} />}</td>

                                    </tr>
                                ) : (
                                    <>
                                        {
                                            exportData.map(data => (
                                                <tr key={data.uid}>
                                                    <td>{data.provinceState?data.provinceState:'N/A'}</td>
                                                    <td>{data.countryRegion}</td>
                                                    <td>{data.confirmed}</td>
                                                    <td>{data.deaths}</td>
                                                    <td>{data.active}</td>
                                                    <td>{data.incidentRate}</td>
                                                    <td>{data.lat}</td>
                                                    <td>{data.long}</td>
                                                    <td>{data.lastUpdate}</td>
                                                </tr>
                                            ))
                                        }
                                    </>
                                )
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    )
}

export default HomeScreen;
