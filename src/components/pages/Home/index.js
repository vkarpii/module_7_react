import {useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import SearchBar from "../../pageComponents/SearchBar";
import Loading from "../../pageComponents/Loading";
import CertificateTable from "../../pageComponents/CertificateTable";
import Pagination from "../../pageComponents/Pagination";
import UrlParams from "../../../constants/params";
import ErrorPage from "../ErrorPage";


const HomeWrapper = (props) => {
    const [searchParams,setSearchParams] = useSearchParams();
    const [user,setUser] = useState(props.user);
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);
    const [paramsMap,setParamsMap]
        = useState(new Map([[UrlParams.Size,'10'],
                            [UrlParams.Page,'0'],
                            [UrlParams.OrderByDate,''],
                            [UrlParams.OrderByName,''],
                            [UrlParams.SearchByName,''],
                            [UrlParams.SearchByDesc,'']
    ]));
    const [totalCount,setTotalCount] = useState(0);

    const onChange = (map) => {
        const urlSearchParams = new URL(document.URL).searchParams;
        let copy = new Map();
        for (const [key, value] of searchParams.entries()) {
            urlSearchParams.delete(key);
        }
        for (const [key, value] of map.entries()) {
                copy.set(key,value);
                if (value !== '')
                    urlSearchParams.set(key,value);
        }
        setParamsMap(copy);
       setSearchParams(urlSearchParams)
    }

    React.useEffect(() => {
        let copy = paramsMap;
        for (const [key, value] of searchParams.entries()) {
            if (copy.has(key)){
                copy.set(key,value);
            }
        }
        const params = new URL(document.URL).searchParams;
        for (const [key, value] of copy.entries()) {
            params.set(key,value);
        }
        setParamsMap(copy);
        fetchCertificates(copy);
    },[paramsMap,searchParams]);

    const fetchCertificates =  async(map) => {
        setIsLoading(true);
        let order = '';
        if (map.get(UrlParams.OrderByName) !== 'none'){
            order += '&order=' + map.get(UrlParams.OrderByName);
        }
        if (map.get(UrlParams.OrderByDate) !== 'none'){
            order += '&order=' + map.get(UrlParams.OrderByDate);
        }
        let url = "http://localhost:8080/api/gift-certificate" + "?page=" + map.get(UrlParams.Page) +
            "&size=" + map.get(UrlParams.Size) +
            "&" + UrlParams.SearchByName + "=" + map.get(UrlParams.SearchByName) +
            "&" + UrlParams.SearchByDesc + "=" + map.get(UrlParams.SearchByDesc)+ order;
        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then(certificateList => {
                setTotalCount(certificateList.totalElements);
                setData(certificateList.content);
                console.log(certificateList.content === [])
            })
            .catch((er) => {
                console.error(er);
                setError(er);
            }).finally(() => {
                setIsLoading(false);
            });
    }

    const onChangeElementsPerPage = (el) => {
        if (paramsMap.get(UrlParams.Size) !== el){
            const params = new URL(document.URL).searchParams;
            params.set(UrlParams.Size,el);
            setParamsMap(paramsMap.set(UrlParams.Size,el));
            setSearchParams(params);
        }
    }

    const onChangePage = (el) => {
        if (paramsMap.get(UrlParams.Page) !== el){
            const params = new URL(document.URL).searchParams;
            params.set(UrlParams.Page,el);
            setParamsMap(paramsMap.set(UrlParams.Page,el));
            setSearchParams(params);
        }
    }

    return <div>
        {isLoading ? (
            <Loading/>
        ) : (
            <>
                {error !== null &&
                    <ErrorPage/>
                }
                {error === null &&
                    <>
                        <SearchBar onChange={onChange}
                                   filterMap={paramsMap}/>
                        {data.length > 0 &&
                            <>
                                <CertificateTable data={data} user={user}/>
                                <Pagination onChangeElementsPerPage={onChangeElementsPerPage}
                                            onChangePage={onChangePage}
                                            totalCount={totalCount}
                                            currentPage={Number(paramsMap.get(UrlParams.Page))}
                                            elementsPerPage={Number(paramsMap.get(UrlParams.Size))}
                                />
                            </>
                        }
                        {data.length === 0 &&
                            <div className="bg-danger text-white text-center p-2 m-5 rounded">Nothing was found for your request</div>
                        }
                    </>
                }
            </>
        )}
        }
    </div>;
}

export default HomeWrapper;