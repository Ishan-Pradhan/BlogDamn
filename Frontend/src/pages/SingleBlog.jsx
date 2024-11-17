import React from 'react'
import Header from '../components/Navbar/Header'

function SingleBlog() {
  return (
    <>
      <Header />
      <div className='container flex flex-col mt-8 md:w-[60%]'>
        <span className='text-3xl font-bold mb-5'>Demon Slayer trilogy</span>
        <div className="flex gap-3 items-center mb-10">
            <img src="images/avatar.jpg" className='h-10 w-10 rounded-full' alt="" />
            <div className='flex flex-col'>
                <span className='font-semibold text-sm'>AnimeHerneManxey</span>
                <div className='text-xs flex gap-2'>
                <p  className='text-gray-600'>Published in <span className='font-bold text-gray-900 cursor-pointer'>Anime</span></p>
                <div className='flex items-center gap-1'>

                <i className="fa-solid fa-circle text-[4px] text-gray-600"></i>
                <span before="<i className='fa-solid fa-circle'></i>" className='text-gray-600 '>June 30,2024</span>
                </div>
                </div>
            </div>
        </div>

        <div className='py-4 flex gap-8 border-y mb-10'>
            <div className='flex items-center gap-2'>
        <i className="fa-regular fa-heart text-lg border py-2 px-3 rounded-full bg-line text-secondary"></i>
        <span className='text-sm font-semibold'>1</span>
            </div>
            <div className='flex items-center gap-2'>
        <i className="fa-regular fa-comment text-lg py-2 px-3 rounded-full border bg-line text-secondary"></i>
        <span className='text-sm font-semibold'>3</span>
            </div>
        </div>

        <div className='w-full h-[450px]  mb-10 rounded-xl'>
            <img src="images/photo1.jpg" className='w-full h-full object-cover rounded-xl' alt="" />
        </div>

        <div className='pb-5 mb-5 border-b-4 leading-relaxed'>
            <p>Demon Slayer: Kimetsu no Yaiba is a Japanese manga series and TV show about a young boy who becomes a demon slayer to avenge his family and cure his sister: 
Story
Set in early 20th century Japan, the story follows Tanjiro Kamado, a 13-year-old boy who returns home to find his family murdered and his sister Nezuko turned into a demon. Tanjiro trains to join the Demon Slayer Corps, an underground organization that protects humans from demons. </p>

<p>Characters
Some characters in the series include:
Tanjiro Kamado: The main character who becomes a demon slayer 
Nezuko Kamado: Tanjiro's younger sister who is turned into a demon 
Tomioka: A character who uses a katana and the kata “Mizu no Kokyuu” </p>

<p>Format
The series was written and illustrated by Koyoharu Gotōge and is available on major streaming services. The TV show premiered in April 2019 and has aired on Tokyo MX, Fuji TV, and Adult Swim's Toonami. </p>

<p>Reception
The series has received critical acclaim for its storyline, animation, action sequences, characters, and voice acting. It's considered one of the best anime of the 2010s</p>
</div>

<div className='flex flex-col mb-10'>
    <h2 className='text-xl font-semibold mb-4'>Comments</h2>
    <div className='flex gap-2 '>
    <img src="images/avatar.jpg" className='h-10 w-10 rounded-full' alt="" />
    <textarea placeholder='Write what you feel about this post' className='border md:w-[500px] md:h-[200px] p-4'></textarea>
    </div>
</div>

<div className='flex flex-col mb-10'>
    <div className='flex gap-4 py-4  border-b'>
    <img src="images/avatar.jpg" className='h-10 w-10 rounded-full' alt="" />
    <p className='w-full '>Its a piece of shit anime. Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit </p>
</div>
<div className='flex gap-4 py-4  border-b'>
    <img src="images/avatar.jpg" className='h-10 w-10 rounded-full' alt="" />
    <p className='w-full '>Its a piece of shit anime. Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit </p>
</div>
<div className='flex gap-4 py-4  border-b'>
    <img src="images/avatar.jpg" className='h-10 w-10 rounded-full' alt="" />
    <p className='w-full '>Its a piece of shit anime. Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit </p>
</div>
<div className='flex gap-4 py-4  border-b'>
    <img src="images/avatar.jpg" className='h-10 w-10 rounded-full' alt="" />
    <p className='w-full '>Its a piece of shit anime. Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit anime.Its a piece of shit </p>
</div>

      </div>
      </div>
    </>
  )
}

export default SingleBlog
