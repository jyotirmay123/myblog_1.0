import { InMemoryDbService } from 'angular2-in-memory-web-api';

export /**
 * BlogData
 */
class BlogData  implements InMemoryDbService {
    createDb() {
        let blogData = [
            {blogDate:12022002, blogContent:"content1", blogger:"JJ", blogId:0},
            {blogDate:13022002, blogContent: "content12", blogger: "JJ", blogId: 1}
        ];
        return {BlogData};
    }
}