import React, { useState, useEffect } from 'react';
import Editor from '../components/Editor'
import Room from '../components/Room'
import { getLesson, getChapter, isLastChapter, isLastLesson } from '../lib/lesson'
import Lesson from '../components/Lesson'
import { useStateValue } from '../components/StateProvider'
import lessons from '../lib/lessons';
import { RETRY, SUCCESS } from '../actions';

export default (props) => {
  const [level, setLevel] = useState(1)
  const [lesson, setLesson] = useState(getLesson(props.location.pathname))
  const [chapter, setChapter] = useState(getChapter(lesson, props.location.pathname))
  const [completed, setCompleted] = useState(chapter.id === 0 ? true : false)
  const [success, setSuccess] = useState(false)
  const [{ hero, editor, enemy }, dispatch] = useStateValue();
  const objectivePosition = chapter.id !== 0 ? chapter.answer.player_position : null
  const [incorrect, setIncorrect] = useState(false)

  const playerReachedObjective = () => {
    let reachedObjective = true
    Object.keys(objectivePosition).map(pos => {
      if (hero.position[pos] !== objectivePosition[pos]) {
        reachedObjective = false
      }
      return pos
    })
    return reachedObjective
  }
  if (objectivePosition !== null & editor.executed && !incorrect && !completed) {
    if (playerReachedObjective()) {
      dispatch({ type: SUCCESS })
      setCompleted(true)
      setSuccess(true)
    } else {
      setIncorrect(true)
    }
  }

  const next = () => {
    let nextLesson = isLastChapter(lesson, chapter) && !isLastLesson(lesson) ? getLesson(lessons[lesson.id].path) : lesson
    let nextChapter = nextLesson !== lesson ? nextLesson.chapters[0] : nextLesson.chapters[chapter.id + 1]
    setChapter(nextChapter)
    setLesson(nextLesson)
    props.history.push(`/lessons/${nextLesson.path}/${nextChapter.path}`)
  }
  
  const tryAgain = () => {
    setIncorrect(false)
    dispatch({ type: RETRY })
  }

  return (
    <div className="container">
      <div className="game-container">
        <div className="game">
          <Room level={level} />
        </div>
        <div className="lesson-container">
          <Lesson
            lesson={lesson}
            chapter={chapter}
            next={next}
            completed={completed}
            incorrect={incorrect}
            tryAgain={tryAgain}
            success={success}
          />
        </div>
      </div>
      <Editor placeholder={chapter.example} />
    </div>

  );
}
