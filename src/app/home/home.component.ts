import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  quotes = [
    { text: "The important thing is not to stop questioning. Curiosity has its own reason for existing.", author: "Albert Einstein" },
    { text: "Physics is the law of the world, and the law is the physics of the world.", author: "Anonymous" },
    { text: "The universe is made of stories, not of atoms.", author: "Muriel Rukeyser" },
    { text: "What we know is a drop, what we don't know is an ocean.", author: "Isaac Newton" },
    { text: "The good thing about science is that it's true whether or not you believe in it.", author: "Neil deGrasse Tyson" },
    { text: "Science is a way of thinking much more than it is a body of knowledge.", author: "Carl Sagan" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "The only source of knowledge is experience.", author: "Albert Einstein" },
    { text: "If I have seen further it is by standing on the shoulders of Giants.", author: "Isaac Newton" },
    { text: "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.", author: "Albert Einstein" },
    { text: "Physics is like sex: sure, it may give some practical results, but that's not why we do it.", author: "Richard P. Feynman" },
    { text: "Not only is the universe stranger than we think, it is stranger than we can think.", author: "Werner Heisenberg" },
    { text: "The saddest aspect of life right now is that science gathers knowledge faster than society gathers wisdom.", author: "Isaac Asimov" },
    { text: "We are all connected; To each other, biologically. To the earth, chemically. To the rest of the universe atomically.", author: "Neil deGrasse Tyson" },
    { text: "The universe is not required to be in perfect harmony with human ambition.", author: "Carl Sagan" },
    { text: "A man who has committed a mistake and doesn't correct it is committing another mistake.", author: "Confucius" },
    { text: "The scientist is not a person who gives the right answers, he's one who asks the right questions.", author: "Claude Lévi-Strauss" },
    { text: "The whole of science is nothing more than a refinement of everyday thinking.", author: "Albert Einstein" },
    { text: "I'm not a genius. I'm just passionately curious.", author: "Albert Einstein" },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "It is a capital mistake to theorize before one has data.", author: "Arthur Conan Doyle" },
    { text: "The art and science of asking questions is the source of all knowledge.", author: "Thomas Berger" },
    { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
    { text: "The first principle is that you must not fool yourself and you are the easiest person to fool.", author: "Richard P. Feynman" },
    { text: "The world is full of obvious things which nobody by any chance ever observes.", author: "Arthur Conan Doyle" },
    { text: "The man of science has learned to believe in justification, not by faith, but by verification.", author: "Thomas Huxley" },
    { text: "The great tragedy of science - the slaying of a beautiful hypothesis by an ugly fact.", author: "Thomas Huxley" },
    { text: "Science is organized knowledge. Wisdom is organized life.", author: "Immanuel Kant" },
    { text: "The aim of science is to seek the simplest explanations of complex facts.", author: "Hugh Miller" },
    { text: "Science is the great antidote to the poison of enthusiasm and superstition.", author: "Adam Smith" },
    { text: "There is no law except the law that there is no law.", author: "John Archibald Wheeler" },
    { text: "The universe is a pretty big place. If it's just us, seems like an awful waste of space.", author: "Carl Sagan" },
    { text: "The beauty of a living thing is not the atoms that go into it, but the way those atoms are put together.", author: "Carl Sagan" },
    { text: "Somewhere, something incredible is waiting to be known.", author: "Carl Sagan" },
    { text: "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.", author: "Carl Sagan" },
    { text: "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. We are made of starstuff.", author: "Carl Sagan" },
    { text: "We are like butterflies who flutter for a day and think it is forever.", author: "Carl Sagan" },
    { text: "For small creatures such as we the vastness is bearable only through love.", author: "Carl Sagan" },
    { text: "The sky calls to us. If we do not destroy ourselves, we will one day venture to the stars.", author: "Carl Sagan" },
    { text: "The universe seems neither benign nor hostile, merely indifferent.", author: "Carl Sagan" },
    { text: "I don't want to believe. I want to know.", author: "Carl Sagan" },
    { text: "Absence of evidence is not evidence of absence.", author: "Carl Sagan" },
    { text: "It is far better to grasp the universe as it really is than to persist in delusion, however satisfying and reassuring.", author: "Carl Sagan" },
    { text: "We make our world significant by the courage of our questions and the depth of our answers.", author: "Carl Sagan" }
  ];
}
