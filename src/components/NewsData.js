import React, { useEffect, useState } from 'react'
import getNews from './Service/getNews';
import moment from 'moment';
import alanBtn from '@alan-ai/alan-sdk-web';

const NewsData = () => {

  const [newsData, setNewsData] = useState([]);
  const [selectOption, setSelectOption] = useState("");

  const getAllNews = async () => {
    setNewsData(await getNews(selectOption));
  }

  const selectCategory = (event) => {
    setSelectOption(event.target.value);
  }

  useEffect(() => {
    alanBtn({
        key: 'e034c8028e2c77c9924781a349966ce22e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: (commandData) => {
          console.log(commandData.data)
          setSelectOption(commandData.data)
        }
    });
  }, []);

  useEffect(() => {
    getAllNews();
  }, [selectOption])

  return (
    <div className='main'>
      <h1>News Sphere</h1>
      <div className='select'>
      <label for="cars">Choose a Category</label>

      <select onChange={selectCategory} className='select-box' name="category" id="category" value={selectOption}>
        <option value="general">General</option>
        <option value="health">Health</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
      </select>
      </div>
      <div className='grid-main'>
        {newsData.map((news) => {
          return (
            <div className='grid-child'>
              <img className='news-image' src = {news.urlToImage}/>
              <p className='news-title'>{news.title}</p>
              <p className='news-content'>{news.content}</p>
              <div className='authDate'>
              <p className='news-author'>Author: {news.author ? news.author : "Anonymous"}</p>
              <p className='news-date'>Date: {moment(news.publishedAt).format('LL')}</p>
              </div>
              <a href= {news.url} target='_blank'>Read More ..</a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default NewsData