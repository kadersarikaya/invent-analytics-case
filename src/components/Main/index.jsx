import { useState, useEffect } from 'react';
import './main.scss'
import { getFirstRenderedMovies } from '../../utils/api';
import {Container, Row, Col, Pagination} from 'react-bootstrap';
import { Link } from "react-router-dom";

const Main = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true)
                const response = await getFirstRenderedMovies()
                setMovies(response)
                setLoading(false)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchMovies()
    }, [])

    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div className="container">
            <Container>
                <Row>
                    {loading ? "loading" : 
                        <>
                            {movies?.map((movie) => (
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

            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </div>
    );
};

export default Main;
