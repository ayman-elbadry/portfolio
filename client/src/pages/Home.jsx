import { useState, useEffect } from 'react';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience, { Education } from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const [data, setData] = useState({ profile: null, projects: [], skills: [], experiences: [], education: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get('/api/profile'),
      API.get('/api/projects'),
      API.get('/api/skills'),
      API.get('/api/timeline?type=experience'),
      API.get('/api/timeline?type=education'),
    ])
      .then(([profile, projects, skills, exp, edu]) => {
        setData({
          profile: profile.data,
          projects: projects.data,
          skills: skills.data,
          experiences: exp.data,
          education: edu.data,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-10 h-10 border-3 border-purple border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Hero profile={data.profile} />
      <About profile={data.profile} />
      <Skills skills={data.skills} />
      <Experience experiences={data.experiences} />
      <Education education={data.education} />
      <Projects projects={data.projects} />
      <Contact profile={data.profile} />
      <Footer profile={data.profile} />
    </>
  );
}
