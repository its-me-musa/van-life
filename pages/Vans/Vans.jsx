import React, { Suspense } from 'react'
import { 
    Link, 
    useSearchParams, 
    useLoaderData, 
    defer,
    Await
} from 'react-router-dom'
    
import { getVans } from '../../api'

export function loader() {
    return defer({ vans: getVans() })
}

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams()
    const dataPromise = useLoaderData()
        
    const typeFilter = searchParams.get('type')
    
    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }
    
    function renderVanElements(vans) {
        const displayedVans = typeFilter 
            ? vans.filter(van => van.type === typeFilter)
            : vans
        
        const vanElements = displayedVans.map(van => (
            <div key={van.id} className="van-tile">
                <Link 
                    to={van.id} 
                    state={{ 
                        search: `?${searchParams.toString()}`,
                        type: typeFilter 
                    }}
                >
                    <img src={van.imageUrl} />
                    <div className="van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}<span>/day</span></p>
                    </div>
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                </Link>
            </div>
        ))
        
        return (
            <>
                <div className="van-list-filter-buttons">
                    <button 
                        className={
                            `van-type simple ${typeFilter === 'simple' ? 'selected' : ''}`
                        }
                        // onClick={() => setSearchParams({type: 'simple'})}
                        onClick={() => handleFilterChange('type', 'simple')}
                    >Simple</button>
                    
                    <button
                        className={
                            `van-type luxury ${typeFilter === 'luxury' ? 'selected' : ''}`
                        }
                        // onClick={() => setSearchParams({type: 'luxury'})}
                        onClick={() => handleFilterChange('type', 'luxury')}
                    >Luxury</button>
                    
                    <button 
                        className={
                            `van-type rugged ${typeFilter === 'rugged' ? 'selected' : ''}`
                        }
                        // onClick={() => setSearchParams({type: 'rugged'})}
                        onClick={() => handleFilterChange('type', 'rugged')}
                    >Rugged</button>
                    
                    
                    {typeFilter ? (
                        <button className="van-type clear-filters" 
                            onClick={() => handleFilterChange('type', null)}
                        >Clear Filter</button>
                    ) : null}
                </div>
                
                <div className="van-list">
                    {vanElements}
                </div>
            </>
        )
    }

    return (
        <div className="van-list-container">
            
            <h1>Explore our van options</h1>
            <Suspense fallback={<h2>Loading vans...</h2>}>
                <Await resolve={ dataPromise.vans }>
                    {renderVanElements}
                </Await>
            </Suspense>
        </div>
    )
}


