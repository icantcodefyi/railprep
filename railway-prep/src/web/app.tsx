import { Route, Switch } from "wouter";
import Index from "./pages/index";
import ExamPage from "./pages/exam";
import SubjectPage from "./pages/subject";
import ChapterPage from "./pages/chapter";
import LessonPage from "./pages/lesson";
import PracticePage from "./pages/practice";
import Dashboard from "./pages/dashboard";
import SearchPage from "./pages/search";
import FlashcardsPage from "./pages/flashcards";
import { Provider } from "./components/provider";

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/search" component={SearchPage} />
        <Route path="/exam/:examId" component={ExamPage} />
        <Route path="/subject/:subjectId" component={SubjectPage} />
        <Route path="/chapter/:chapterId" component={ChapterPage} />
        <Route path="/lesson/:lessonId" component={LessonPage} />
        <Route path="/practice/:chapterId" component={PracticePage} />
        <Route path="/flashcards/:chapterId" component={FlashcardsPage} />
      </Switch>
    </Provider>
  );
}

export default App;
