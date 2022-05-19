import React, { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import ImageLoader from './ui/Loader/Loader';
import styles from './App.module.css';
import { Title } from './ui/Title';
import { Notify } from 'notiflix';
import { ButtonLoad } from './ui/Button';
import imagesAPI from '../services/serviceApi';
import { Modal } from './Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    searchQuery: '',
    status: Status.IDLE,
    images: [],
    currentPage: 1,
    error: null,
    showModal: false,
    modalImageUrl: '',
    totalImages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const newQuery = this.state.searchQuery;
    const prevPage = prevState.currentPage;
    const newPage = this.state.currentPage;

    if (newQuery !== prevQuery) {
      this.setState({
        images: [],
        totalImages: 0,
        currentPage: 1,
        error: null,
        showModal: false,
        largeImageURL: '',
        tags: '',
        status: Status.PENDING,
      });
      return this.fetchImages(newQuery, this.state.currentPage);
    }
    if (newPage !== prevPage && newPage !== 1) {
      return this.fetchImages(newQuery, this.state.currentPage);
    }
  }

  fetchImages(query, page) {
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
        this.setState(prevState => ({
          images: [...prevState.images, ...composedImages],
          status: Status.RESOLVED,
          totalImages: totalHits,
        }));
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  }

  formSubmitHandler = searchQuery => {
    this.setState({ searchQuery });
  };
  pageHandler = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };
  toggleModal = (largeImageURL = null, tags = '') => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageURL,
      tags,
    }));
  };

  render() {
    const {
      images,
      totalImages,
      error,
      status,
      showModal,
      largeImageURL,
      tags,
    } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onCloseModal={this.toggleModal}
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
              images={this.state.images}
              showModal={this.state.showModal}
              toggleModal={this.toggleModal}
            />
            {images.length < totalImages ? (
              <ButtonLoad
                className={styles.btnLoad}
                title="Load more"
                onClick={this.pageHandler}
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
  }
}
