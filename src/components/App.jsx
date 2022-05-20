import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import ImageLoader from './ui/Loader/Loader';
import styles from './App.module.css';
import { Title } from './ui/Title';
import { Notify } from 'notiflix';
import { ButtonLoad } from './ui/Button';
import imagesAPI from '../services/serviceApi';
import { Modal } from './Modal';
import { useAfterInitEffect } from '../hooks/useAfterInitEffect';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [searchQuery, setSetSearchQuery] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalImages, setTotalImages] = useState(0);
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (searchQuery != '') {
      setImages([]);
      setTotalImages(0);
      setCurrentPage(1);
      setError(null);
      setStatus(Status.PENDING);
      setShowModal(false);
      setLargeImageURL('');
      setTags('');
      fetchImages(searchQuery, currentPage);
    }
    return;
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery != '') {
      fetchImages(searchQuery, currentPage);
    }
  }, [currentPage]);

  const fetchImages = (query, page) => {
    imagesAPI
      .fetchImages(query, page)
      .then(({ hits, totalHits }) => {
        const composedImages = hits.map(
          ({ id, webformatURL, tags, largeImageURL }) => ({
            id,
            webformatURL,
            tags,
            largeImageURL,
          })
        );
        setImages([...images, ...composedImages]);
        setStatus(Status.RESOLVED);
        setTotalImages(totalHits);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  };

  const formSubmitHandler = searchQuery => {
    setSetSearchQuery(searchQuery);
  };
  const pageHandler = () => {
    setCurrentPage(currentPage + 1);
  };
  const toggleModal = (largeImageURL = null, tags = '') => {
    setShowModal(prevState => !prevState);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  return (
    <div>
      <Searchbar onSubmit={formSubmitHandler} />
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          onCloseModal={toggleModal}
          tags={tags}
        />
      )}
      {status === 'idle' ? (
        <Title
          className={styles.galaryTitle}
          title="No search results yet. Please enter a request"
        />
      ) : null}
      {status === 'pending' ? <ImageLoader /> : null}
      {status === 'rejected' ? Notify.warning(`${error.message}`) : null}
      {status === 'resolved' ? (
        <>
          <ImageGallery
            images={images}
            showModal={showModal}
            toggleModal={toggleModal}
          />
          {images.length < totalImages ? (
            <ButtonLoad
              className={styles.btnLoad}
              title="Load more"
              onClick={pageHandler}
            />
          ) : (
            <Title
              className={styles.galaryTitle}
              title="no more images from request"
            />
          )}
        </>
      ) : null}
    </div>
  );
};
