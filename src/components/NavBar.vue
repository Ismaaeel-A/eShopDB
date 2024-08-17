<template>
    <nav class="navbar navbar-expand-lg sticky-top">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/"><img src="https://achar1f.github.io/projectimages/images/Logo.jpg" alt="lol" logo></router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto px-3">
            <li class="nav-item">
              <a class="nav-link mx-2" href="#landing">Home</a>
            </li>
  
            <li class="nav-item">
              <a class="nav-link mx-2" href="#about">About</a>
            </li>
  
            <li class="nav-item">
              <a class="nav-link mx-2" href="#education">Education</a>
            </li>
  
            <li class="nav-item">
              <a class="nav-link mx-2" href="#skills">Skills</a>
            </li>
  
            <li class="nav-item">
              <a class="nav-link mx-2" href="#project">Projects</a>
            </li>
  
            <li class="nav-item">
              <a class="nav-link mx-2" href="#testimonials">Testimonials</a>
            </li>
  
            <li class="nav-item">
              <a class="nav-link mx-2" href="#reachMe">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <style scoped>
  a:hover {
    text-shadow: 0 0 3px var(--font);
    color: var(--accent);
  }
  </style>