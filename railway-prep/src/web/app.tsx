import { Route, Switch } from "wouter";
import Index from "./pages/index";
import ExamPage from "./pages/exam";
import SubjectPage from "./pages/subject";
import ChapterPage from "./pages/chapter";
import LessonPage from "./pages/lesson";
import PracticePage from "./pages/practice";
import { Provider } from "./components/provider";

function App() {
        return (
                <Provider>
                        <Switch>
                                <Route path="/" component={Index} />
                                <Route path="/exam/:examId" component={ExamPage} />
                                <Route path="/subject/:subjectId" component={SubjectPage} />
                                <Route path="/chapter/:chapterId" component={ChapterPage} />
                                <Route path="/chapter/:chapterId/practice" component={PracticePage} />
                                <Route path="/lesson/:lessonId" component={LessonPage} />
                        </Switch>
                </Provider>
        );
}

export default App;
