// MovieDetail.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './detail.scss';
import { getMovieDetails } from '../../utils/api';

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieDetails(id)
        setMovieDetails(response);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="movie-detail-container">
      <Row>
        <Col md={4}>
          <img src={movieDetails?.Poster} alt={movieDetails.Title} className="movie-poster" />
        </Col>
        <Col md={8}>
          <h1>{movieDetails?.Title}</h1>
          <p><strong>Duration:</strong> {movieDetails?.Runtime}</p>
          <p><strong>Type:</strong> {movieDetails?.Type}</p>
          <p><strong>Director:</strong> {movieDetails?.Director}</p>
          <p><strong>Actors:</strong> {movieDetails?.Actors}</p>
          <p><strong>IMDb Rating:</strong> {movieDetails?.imdbRating}</p>
          <p><strong>Released:</strong> {movieDetails?.Released}</p>
          <p><strong>Plot:</strong> {movieDetails?.Plot}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetail;
