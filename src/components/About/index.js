import React from 'react'

const index = () => {
  return (
    <section class="about">
      <header class="about__header">
        <h2>The creation</h2>
        <hr />
      </header>

      <main class="about__description">
        <p>
          321moviesinfo.com is a website, more precisily, a web app built to
          give cinephiles and non, a great experience by finding the most
          important information about any kind of movie, from the oldest to the
          newest.
        </p>

        <p>It uses the TMDb API but is not endorsed or certified by TMDb.</p>

        <p>
          It gives the possibility to watch the latest trailer out there and
          also, rent or buy any movie, depending on location availability,
          thanks to
          &nbsp;<a href="https://www.themoviedb.org/" title="tmdb" target="_blank" rel="noreferrer noopener">TMDb</a>&nbsp;
          and 
          &nbsp;<a href="https://www.justwatch.com/" title="justwatch" target="_blank" rel="noreferrer noopener">justwatch</a>.
        </p>

        <p>Enjoy.</p>

        <hr />
      </main>
    </section>
  )
}

export default index
