import { useState, useEffect } from 'react';
import './main.scss'
import { getEpisodes, getMovies } from '../../utils/api';
import {
    Container, Row, Col,
    ButtonGroup, Button, Pagination, DropdownButton, Dropdown
} from 'react-bootstrap';
import { Link } from "react-router-dom";
import NavBar from '../Navbar'
import MovieCardSkeleton from '../Skeleton';

const Main = () => {
    const [originalMovies, setOriginalMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [, setFilterType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("Pokemon")
    const [page, setPage] = useState(1);
    const [, setYear] = useState(null)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true)
                const response = await getMovies(query, page)
                setOriginalMovies(response);
                setFilteredMovies(response);
                setLoading(false)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchMovies()
    }, [page, query])


    const filterByType = (type) => {
        setFilterType(type);
        if (type === null) {
            setFilteredMovies(originalMovies);
        } else {
            const filtered = originalMovies.filter((movie) => movie.Type === type);
            setFilteredMovies(filtered);
        }
    };

    const handleAllFilter = () => {
        filterByType(null);
    };

    const handleMovieFilter = () => {
        filterByType('movie');
    };

    const handleSeriesFilter = () => {
        filterByType('series');
    };

    const handleYearFilter = (selectedYear) => {
        setYear(selectedYear);
        const filteredByYear = originalMovies.filter((movie) => movie.Year === selectedYear);
        setFilteredMovies(filteredByYear);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0) {
            setPage(pageNumber);
        }
    };

    const handleEpisodes = () => {
        const fetchEpisodes = async () => {
            try {
                setLoading(true)
                const response = await getEpisodes(query, 1)
                setFilteredMovies(response.Episodes);
                setLoading(false)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchEpisodes()
    }


    let active = page;
    let items = [];
    for (let number = 1; number <= 10; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => handlePageChange(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <>
            <NavBar query={query} setQuery={setQuery} />
            <div className="container">
                <ButtonGroup className="mb-2">
                    <Button variant="secondary" onClick={handleAllFilter}>All</Button>
                    <Button variant="secondary" onClick={handleMovieFilter}>Movies</Button>
                    <Button variant="secondary" onClick={handleSeriesFilter}>Series</Button>
                    <Button variant="secondary" onClick={handleEpisodes}>Episodes</Button>
                    <DropdownButton variant="secondary" as={ButtonGroup} title="Year" id="bg-nested-dropdown">
                        {Array.from(new Set(originalMovies?.map(movie => movie.Year))).map(year => (
                            <Dropdown.Item key={year} onClick={() => handleYearFilter(year)}>
                                {year}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </ButtonGroup>

                <Container>
                    {loading ? (
                        <Row className="g-4">
                            {[...Array(10)].map((_, index) => (
                                <Col  sm={6} lg={4} xs={12} key={index}>
                                    <MovieCardSkeleton />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <Row>
                            {!filteredMovies || filteredMovies.length === 0 ? (
                                <div className="error">
                                    <p >No movies found!</p>
                                        <Button onClick={() => setQuery("Pokemon")} variant='light' >
                                            {`Back to Home -> `}
                                        </Button>
                                </div>
                            ) : (
                                filteredMovies?.map((movie) => (
                                    <Col sm={6} lg={4} xs={12} key={movie.imdbID}>
                                        <Link className='no-underline-link' to={`/${movie.imdbID}`}>
                                            <div className="movie-card">
                                                    {movie.Poster !== "N/A" ?
                                                        <img src={movie.Poster} alt="" />
                                                        : <img src={"https://placehold.co/400x400"} alt="" />
                                                    }
                                                <div className="movie-details">
                                                    <h3>{movie.Title}</h3>
                                                    <p>IMDb ID: {movie.imdbID}</p>
                                                    <p>Released Date: {movie.Released ? movie.Released : movie.Year}</p>
                                                    {movie.Episode && <p>Episode: <strong>
                                                        {movie.Episode}</strong> </p>}
                                                </div>
                                            </div>
                                        </Link>
                                    </Col>
                                ))
                            )}
                        </Row>
                    )}
                </Container>

                <Pagination className='pagination'>
                    <Pagination.First onClick={() => handlePageChange(1)} />
                    <Pagination.Prev onClick={() => handlePageChange(page - 1)} />
                    {items}
                    <Pagination.Ellipsis />
                    <Pagination.Next onClick={() => handlePageChange(page + 1)} />
                    <Pagination.Last onClick={() => handlePageChange(5)} />
                </Pagination>
            </div>
        </>
    );
};

export default Main;
