const SERVER_ERROR_CODE = 500;
const SERVER_ERROR_MESSAGE = 'Неизвестная ошибка сервера';
const NOT_FOUND_ROUTE_MESSAGE = 'Запрашиваемый адрес запроса не найден';
const NOT_FOUND_USER_ID_MESSAGE = 'Пользователь с данным id не найден';
const NOT_FOUND_MOVIE_ID_MESSAGE = 'Фильм с данным id не найдена';
const NOT_RIGHTS_MESSAGE = 'Нет прав на удаление';
const INCORRECT_DATA_MESSAGE = 'Некорректные данные';
const LOGIN_ERROR_MESSAGE = 'Неверное имя пользователя или пароль';
const NOT_REGISTERED_MESSAGE = 'Необходимо авторизироваться';
const EXIST_EMAIL_MESSAGE = 'Пользователь с таким email уже существует';

module.exports = {
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  NOT_FOUND_ROUTE_MESSAGE,
  INCORRECT_DATA_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  NOT_FOUND_USER_ID_MESSAGE,
  NOT_FOUND_MOVIE_ID_MESSAGE,
  NOT_RIGHTS_MESSAGE,
  NOT_REGISTERED_MESSAGE,
  EXIST_EMAIL_MESSAGE,
};
