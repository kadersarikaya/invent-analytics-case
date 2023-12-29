import { useState, useEffect } from 'react';
import './main.scss'
import { getFirstRenderedMovies } from '../../utils/api';
import { Container, Row, Col, 
ButtonGroup, Button, Pagination, DropdownButton, Dropdown} from 'react-bootstrap';
import { Link } from "react-router-dom";

const Main = () => {
    const [originalMovies, setOriginalMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [filterType, setFilterType] = useState(null);

    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("Pokemon")
    const [page, setPage] = useState(1);
    const [year,setYear] = useState(null)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true)
                const response = await getFirstRenderedMovies(query, page)
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
        if(pageNumber>0) {
            setPage(pageNumber);
        }
    };

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
        <div className="container">
            <ButtonGroup className="mb-2">
                <Button variant="secondary" onClick={handleAllFilter}>All</Button>
                <Button variant="secondary" onClick={handleMovieFilter}>Movies</Button>
                <Button variant="secondary" onClick={handleSeriesFilter}>Series</Button>
                <Button variant="secondary">Episodes</Button>
                <DropdownButton variant="secondary" as={ButtonGroup} title="Year" id="bg-nested-dropdown">
                    {Array.from(new Set(originalMovies.map(movie => movie.Year))).map(year => (
                        <Dropdown.Item key={year} onClick={() => handleYearFilter(year)}>
                            {year}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </ButtonGroup>

            <Container>
                <Row>
                    {loading ? "loading" : 
                        <>
                            {filteredMovies?.map((movie) => (
                                <Col sm={6} lg={4} xs={12}
                                    key={movie.imdbID} >
                                    <Link to={`/${movie.Type}/${movie.imdbID}`} className="no-underline-link" >
                                        <div className="movie-card">
                                            <img src={movie.Poster} alt="" />
                                            <div className="movie-details">
                                                <h3>{movie.Title}</h3>
                                                <p>IMDb ID: {movie.imdbID}</p>
                                                <p>Year: {movie.Year}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            ))}
                        </>
                    }
                </Row> 
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
    );
};

export default Main;
