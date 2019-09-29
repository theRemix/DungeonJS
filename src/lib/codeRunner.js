/*
 * evaluate code
 * queue dispatches
 * dispatch in 500ms intervals
 */
import { ATTACK, MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT } from '../actions/hero'
import { RUN, RUNNING, CONSOLE_LOG } from '../actions'

const no = {}
const queue = []

const addToQueue = (action) => {
  queue.push(action)
}

const dequeue = (dispatch) => {
  setTimeout(() => {
    if (queue.length > 0) {
      dispatch(queue[0])
      queue.splice(0, 1)
      dequeue(dispatch)
    } else {
      dispatch({ type: RUN })
    }
  }, 500)
}

const run = (code, dispatch, props) => {
  ((document, window, global, $, ga, jQuery, XMLHttpRequest, Function, Object) => {
    dispatch({ type: RUNNING, code })
    const attack = () => addToQueue({ type: ATTACK, ...props })
    const moveUp = () => addToQueue({ type: MOVE_UP, ...props })
    const moveDown = () => addToQueue({ type: MOVE_DOWN, ...props })
    const moveLeft = () => addToQueue({ type: MOVE_LEFT, ...props })
    const moveRight = () => addToQueue({ type: MOVE_RIGHT, ...props })

    try {
      eval(code)
    } catch (err) {
    }

  })(no, no, no, no, no, no, no, no, no)
  dequeue(dispatch)
}

export default run
