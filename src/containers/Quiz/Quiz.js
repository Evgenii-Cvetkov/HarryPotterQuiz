import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
      results: {}, // {[id] : success error}
      isFinished: false,
      activeQuestion: 0,
        quiz: [
            {
              question: 'У кого Гриндевальд украл бузинную палочку?',
              rightAnswerId: 3,
              id: 1,
                answers: [
                    {text: 'У Дамблдора', id: 1},
                    {text: 'У Олливандера', id: 2},
                    {text: 'У Грегоровича', id: 3},
                    {text: 'У Диппета', id: 4}
                ]
            },
            {
              question: 'Сколько крестражей создал Том Реддл?',
              rightAnswerId: 3,
              id: 2,
                answers: [
                    {text: '5', id: 1},
                    {text: '6', id: 2},
                    {text: '7', id: 3},
                    {text: '8', id: 4}
                ]
            },
            {
              question: 'Кто из мародеров был предателем?',
              rightAnswerId: 2,
              id: 3,
                answers: [
                    {text: 'Сириус Блэк', id: 1},
                    {text: 'Питер Петтигрю', id: 2},
                    {text: 'Римус Люпин', id: 3},
                    {text: 'Джеймс Поттер', id: 4}
                ]
            },
            {
              question: 'Какие серьги носила Полумна?',
              rightAnswerId: 4,
              id: 4,
                answers: [
                    {text: 'Морковки', id: 1},
                    {text: 'Помидорки', id: 2},
                    {text: 'Картофелины', id: 3},
                    {text: 'Редиски', id: 4}
                ]
            },
            {
              question: 'На каком факультете нужно отгадать загадку, чтобы попасть в гостинную?',
              rightAnswerId: 2,
              id: 5,
                answers: [
                    {text: 'Гриффиндор', id: 1},
                    {text: 'Когтевран', id: 2},
                    {text: 'Пууфендуй', id: 3},
                    {text: 'Слизерин', id: 4}
                ]
            },
            {
              question: 'Какое варенье обожал Дамблдор?',
              rightAnswerId: 3,
              id: 6,
                answers: [
                    {text: 'Вишневое', id: 1},
                    {text: 'Смородиновое', id: 2},
                    {text: 'Малиновое', id: 3},
                    {text: 'Черничное', id: 4}
                ]
            },
            {
              question: 'Как зовут домового эльфа Барти Крауча?',
              rightAnswerId: 4,
              id: 7,
                answers: [
                    {text: 'Дооби', id: 1},
                    {text: 'Кикимер', id: 2},
                    {text: 'Похлеба', id: 3},
                    {text: 'Винки', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
      if (this.state.answerState) {
        const key = Object.keys(this.state.answerState)[0]
        if (this.state.answerState[key] === 'success') {
          return
        }
      }


      console.log('Answer Id: ', answerId)

      const question = this.state.quiz[this.state.activeQuestion]
      const results = this.state.results

      if (question.rightAnswerId === answerId) {
        if (!results[question.id]) {
          results[question.id] = 'success'
        }

        this.setState({
          answerState: {[answerId]: 'success'},
          results
        })

        const timeout = window.setTimeout(() => {
          if (this.isQuizFinished()) {
            this.setState({
              isFinished: true  
            })
          } else {
            this.setState({
              activeQuestion: this.state.activeQuestion + 1,
              answerState: null
            })
          }

          window.clearTimeout(timeout)
        }, 1000)
      } else {
        results[question.id] = 'error'
        this.setState({
          answerState: {[answerId]: 'error'},
          results
        })
      }
    }

    isQuizFinished() {
      return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
      this.setState({
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {}
      })
    }

    componentDidMount() {
      console.log('Quiz ID = ', this.props.match.params.id);
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                  <h1>Как хорошо ты знаешь Поттериану?</h1>

                  {
                    this.state.isFinished
                    ? <FinishedQuiz 
                    results={this.state.results}
                    quiz={this.state.quiz}
                    onRetry={this.retryHandler}
                      />
                    : <ActiveQuiz 
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                      />  
                  } 
                </div>
            </div>
        )
    }
}

export default Quiz