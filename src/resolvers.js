import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { articles, authors } from './data';
import { isAuthenticated } from './middlewares';

export default {
    Query: {
        articles(parent, { authorId }, context) {
            if (!isAuthenticated(context)) {
                throw new AuthenticationError(
                    'you must be logged in to query this schema'
                );
            }

            const filtered = articles.filter(
                (article) => article.authorId === authorId
            );

            return filtered.length > 0 ? filtered : undefined;
        },
        article(parent, { id }, context) {
            if (!isAuthenticated(context)) {
                throw new AuthenticationError(
                    'you must be logged in to query this schema'
                );
            }

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
