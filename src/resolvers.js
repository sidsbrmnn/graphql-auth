import jwt from 'jsonwebtoken';
import { articles, authors } from './data';

export default {
    Query: {
        articles(parent, { authorId }) {
            const filtered = articles.filter(
                (article) => article.authorId === authorId
            );

            return filtered.length > 0 ? filtered : undefined;
        },
        article(parent, { id }) {
            return articles.find((article) => article.id === id);
        },
    },
    Mutation: {
        login(parent, { email, password }) {
            const { id } = authors.find(
                (author) =>
                    author.email === email && author.password === password
            );

            return jwt.sign({}, 'some-super-secret-key', {
                algorithm: 'HS256',
                expiresIn: '1d',
                subject: id,
            });
        },
    },
};
