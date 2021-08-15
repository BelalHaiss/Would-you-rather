import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Spinner from './layout/Spinner';
const QuestResult = (props) => {
  const { user, theQuest, loading, users } = props;
  const { id } = props.match.params;
  const quest = theQuest.filter((quest) => id === quest.id);
  const [activeStyle, setActiveStyle] = useState('');
  if (!loading) {
    // eslint-disable-next-line
    const opt1Active = quest[0].optionOne.votes.includes(user[0].id);
    // eslint-disable-next-line
    const opt2Active = quest[0].optionTwo.votes.includes(user[0].id);
    if (!activeStyle) {
      opt1Active ? setActiveStyle(1) : setActiveStyle(2);
    }
  }

  const opt1 = quest[0].optionOne.votes.length;
  const opt2 = quest[0].optionTwo.votes.length;
  const allVotes = opt1 + opt2;
  // eslint-disable-next-line
  const percentFunc = () => {
    if (!loading) {
      const opt1Percent = Math.round((opt1 / allVotes) * 100);
      // eslint-disable-next-line
      const opt2Percent = Math.round((opt2 / allVotes) * 100);
      return { opt1Percent, opt2Percent };
    }
  };

  const theAvatar = (author) => {
    const user = users.filter((user) => user.id === author);

    return user[0].avatarURL;
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div
          className='border '
          style={{ maxWidth: '600px ', margin: '100px auto' }}
        >
          <h3 className='Box-title ml-6'>
            <b style={{ fontSize: '1.2rem' }}>Asked by {quest[0].author}</b>
          </h3>

          <div
            className='Box-body flex-sm-row   border-top'
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div className='text-center ml-4 mr-6'>
              <img
                width='250px'
                src={theAvatar(quest[0].author)}
                alt=''
                className='CircleBadge-icon'
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center'
              }}
            >
              <div style={{ width: '100%' }}>
                <h5 className='text-center'>Results</h5>
                <div
                  className='card  p-2'
                  style={{
                    border: `${
                      activeStyle === 1
                        ? '2px dotted var(--color-border-success)'
                        : ' 0.1px solid  lightgrey'
                    }`
                  }}
                >
                  {activeStyle === 1 && !loading && (
                    <img
                      id='vote-img'
                      width='35px'
                      src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDYwIDYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxzdHlsZT4uYSwuY3tmaWxsOm5vbmU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30uYXtzdHJva2U6IzFjNGRiODtzdHJva2Utd2lkdGg6MS41cHg7fS5ie2ZpbGw6I2U4MmU1Zjt9LmN7c3Ryb2tlOiNlODJlNWY7c3Ryb2tlLXdpZHRoOjIuNXB4O308L3N0eWxlPjwvZGVmcz48dGl0bGUvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMzUuNzQ5LDU4LDM2LjksNDkuNTdhMTYuMTY5LDE2LjE2OSwwLDAsMCw5LjI0MS0xMi4wMjUsMi4zLDIuMywwLDAsMC0yLjI4NC0yLjYzOGgwYTIuMywyLjMsMCwwLDAtMi4yNTQsMS45NSwxMS41MzYsMTEuNTM2LDAsMCwxLTIyLjczOSwwLDIuMywyLjMsMCwwLDAtMi4yNTQtMS45NWgwYTIuMywyLjMsMCwwLDAtMi4yODQsMi42MjksMTYuMTY4LDE2LjE2OCwwLDAsMCw4LjgwNiwxMS44MjNMMjQuMjc1LDU4Ii8+PGxpbmUgY2xhc3M9ImEiIHgxPSIxNS4xOTUiIHgyPSIxMS45MTkiIHkxPSIzNS4zODUiIHkyPSIyNC40NjQiLz48bGluZSBjbGFzcz0iYSIgeDE9IjQ0Ljg5OCIgeDI9IjQ4LjEwNSIgeTE9IjM1LjE1NiIgeTI9IjI0LjQ2NSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNTQuMzM0LDIyLjQ3NWExLjMxNywxLjMxNywwLDAsMS0uODYyLjcxM2MtMi43NTUuNzEzLTE0LjU4MSwzLjY3NS0yMy40NiwzLjY3NVM5LjM0NiwyMy45MDgsNi41NjUsMjMuMTlhMS4zMiwxLjMyLDAsMCwxLS44NzItLjczMUMzLjIyOSwxNy4wNTIsMi4wMjEsMTAuNjQ1LDEuOTUxLDMuMzMyYTEuMzE5LDEuMzE5LDAsMCwxLDEuNjEyLTEuM2MxOC41MjEsNC4yLDM2LjA5NCw0LjE2Miw1Mi44NTEuMDQ2YTEuMzIsMS4zMiwwLDAsMSwxLjYzNSwxLjMwOUM1Ny45LDEwLjQxOCw1Ni45NTIsMTYuOTU2LDU0LjMzNCwyMi40NzVaIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik04LjM5MSw5LjU0NXEuNDIzLjY5Ljc3NywxLjQxN2MuMjM1LjQ3OS40MjQuOTA5LjU3MiwxLjI3Ni4zODMuOTQ5LjcxNCwxLjkxOCwxLjAxLDIuOS4zMTEsMS4wMjkuNiwyLjA3My44MSwzLjEyN2ExLjI2MiwxLjI2MiwwLDAsMCwxLjIwNi45MTgsMS4zMDcsMS4zMDcsMCwwLDAsMS4yMDUtLjkxOGMuMTI1LS4zMTUuMjQxLS42MzUuMzY0LS45NTJxLjItLjUuNC0xYy4wNzItLjE4LjE0NS0uMzU5LjIxOS0uNTM5LjAzOC0uMDk0LjA3Ny0uMTg4LjExNi0uMjgyLjAxNC0uMDMzLjE1OS0uMzc5LjEtLjIzN3MuMDY5LS4xNjEuMDgzLS4yYy4wNS0uMTE2LjEtLjIzMy4xNTEtLjM0OS4wODctLjIuMTc2LS40LjI2NS0uNi4xOTItLjQyNi4zODktLjg1LjYtMS4yN2ExMy40ODUsMTMuNDg1LDAsMCwxLDEuMTQ4LTIuMDA5LDEuMjU5LDEuMjU5LDAsMCwwLS40NDktMS43MSwxLjI3NywxLjI3NywwLDAsMC0xLjcxLjQ0OCwyMy40NzgsMjMuNDc4LDAsMCwwLTIuMzY4LDQuNzIzYy0uNDYyLDEuMS0uODg0LDIuMjA4LTEuMzIzLDMuMzE0aDIuNDExYy0uMjIxLTEuMDkyLS41MTktMi4xNzMtLjg0NC0zLjIzOGEyNi4yMiwyNi4yMiwwLDAsMC0yLjU3OC02LjA3N0ExLjI1LDEuMjUsMCwwLDAsOC4zOTEsOS41NDVaIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik0zNC4xMTMsMTEuMzExYTM1LjUxOSwzNS41MTksMCwwLDAsLjYwNyw4LjkzNCwxLjI2MiwxLjI2MiwwLDAsMCwxLjUzOC44NzMsMS4yNzYsMS4yNzYsMCwwLDAsLjg3My0xLjUzNywzMi44NzYsMzIuODc2LDAsMCwxLS41MTgtOC4yNywxLjI1LDEuMjUsMCwwLDAtMi41LDBaIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik0zMS4yMDUsMTIuMzE5YTI0LjUwOCwyNC41MDgsMCwwLDAsOC4xLS4yMTUsMS4yNTgsMS4yNTgsMCwwLDAsLjg3My0xLjUzOCwxLjI5LDEuMjksMCwwLDAtMS41MzgtLjg3M0wzOC4zLDkuNzRhMS4yNTMsMS4yNTMsMCwwLDAtLjg3MywxLjUzNywxLjI5LDEuMjksMCwwLDAsMS41MzguODczTDM5LjMsMTIuMWwtLjY2NS0yLjQxMWExOS42MjIsMTkuNjIyLDAsMCwxLTMuMzc1LjM3MXEtLjkuMDI3LTEuODA3LS4wMTdjLS4yNzctLjAxNC0uNTUyLS4wMzMtLjgyOC0uMDU3LS4xMzctLjAxMi0uMjc0LS4wMjYtLjQxLS4wNDFsLS4yNzMtLjAzMWMtLjE1Ni0uMDItLjE4MS0uMDIzLS4wNzQtLjAwOWExLjI4NSwxLjI4NSwwLDAsMC0xLjUzNy44NzMsMS4yNjIsMS4yNjIsMCwwLDAsLjg3MywxLjUzN1oiLz48cGF0aCBjbGFzcz0iYiIgZD0iTTQyLjU1NywxMC44NDlxLS4xNDUsMi4zMTMtLjEzMiw0LjYzM2MuMDA1Ljc1NS4wMDgsMS41MTMuMDU1LDIuMjY3YTMuMDA5LDMuMDA5LDAsMCwwLC43MTksMmMxLDEuMDM0LDIuOTYxLjc3MSw0LjIxOS40NkE4LjMyMiw4LjMyMiwwLDAsMCw1MSwxOC4yNThhMS4yNSwxLjI1LDAsMCwwLTEuNzY4LTEuNzY4LDUuNDExLDUuNDExLDAsMCwxLTEuMTU5LjgxLDQuNTY3LDQuNTY3LDAsMCwxLTEuMTkyLjQ2Miw0LjMxMyw0LjMxMywwLDAsMS0xLjM4Ni4xOTFjLS4xMzQsMC0uMjY3LDAtLjQtLjAwOS0uMDkyLDAtLjIzOC0uMDM3LS4yMzEtLjAyLDAsMCwuMTQ3LjExNS4xNjcuMTM4LjA0Ni4wNzQuMDM3LjA1Ny0uMDI4LS4wNTEuMDQ0LjExMS4wNTIuMTI0LjAyNS4wMzdzLS4wNTYtLjI0OC0uMDMtLjA2NmEzLjM3MSwzLjM3MSwwLDAsMS0uMDI0LS4zNDhjLS4wMTYtLjMzMS0uMDI0LS42NjItLjAzMi0uOTkzcS0uMDI0LS45NTItLjAxOS0xLjkuMDA5LTEuOTQ2LjEzMy0zLjg4OGExLjI1NywxLjI1NywwLDAsMC0xLjI1LTEuMjUsMS4yNzksMS4yNzksMCwwLDAtMS4yNSwxLjI1WiIvPjxwYXRoIGNsYXNzPSJiIiBkPSJNNDQuNDM4LDExLjkyOGMuMTMyLS4wNjcuMjY1LS4xMzMuNC0uMi4wNDEtLjAxOS40NjMtLjIuMjIxLS4xcS4zNzQtLjE1NC43NTgtLjI4NWExNC4yMTEsMTQuMjExLDAsMCwxLDEuNzA5LS40N2MuMjcyLS4wNTcuNTQ1LS4xLjgxOS0uMTQ3LjE0OS0uMDIyLjE1Ni0uMDIzLjAxOSwwcS4xMTctLjAxNS4yMzQtLjAyN2MuMTU1LS4wMTYuMzExLS4wMy40NjctLjA0MWExMS40ODMsMTEuNDgzLDAsMCwxLDEuNzEuMDA5LDEuMjU3LDEuMjU3LDAsMCwwLDEuMjUtMS4yNSwxLjI4LDEuMjgsMCwwLDAtMS4yNS0xLjI1LDE0LjU3MiwxNC41NzIsMCwwLDAtNy42LDEuNiwxLjI1OCwxLjI1OCwwLDAsMC0uNDQ4LDEuNzExLDEuMjc5LDEuMjc5LDAsMCwwLDEuNzEuNDQ4WiIvPjxwYXRoIGNsYXNzPSJiIiBkPSJNNDQuMDA1LDE2LjMxMUEyOC40NzMsMjguNDczLDAsMCwwLDQ4Ljk2MSwxNWExLjI1LDEuMjUsMCwwLDAtLjY2NC0yLjQxMUEyOC41ODksMjguNTg5LDAsMCwxLDQzLjM0MSwxMy45YTEuMjQ4LDEuMjQ4LDAsMCwwLS43NDcuNTc0LDEuMjUsMS4yNSwwLDAsMCwxLjQxMSwxLjgzNloiLz48ZWxsaXBzZSBjbGFzcz0iYyIgY3g9IjI0LjI2OSIgY3k9IjE1LjMxMyIgcng9IjQuNzMyIiByeT0iMi45NTEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMzMgMzUuOTUpIHJvdGF0ZSgtNzguMjM4KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMzQuNDI0LDMzLjg5M2ExLjY1MywxLjY1MywwLDAsMSwxLjY1MywxLjY1M3Y2LjQ2OGMwLDIuNDIyLTIuNjE3LDQuMzg1LTUuODQ2LDQuMzg1cy01Ljg0Ny0xLjk2My01Ljg0Ny00LjM4NVYzNS41NDZhMS42NTMsMS42NTMsMCwwLDEsMS42NTMtMS42NTNaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik0yNC4zODQsNDAuMjgzYzQuNjA1Ljk4NSw4LjM5My0uNTUyLDExLjY5NC0zLjYiLz48L3N2Zz4='
                      alt=''
                    />
                  )}
                  <p className='h5-mktg text-center'>
                    {quest[0].optionOne.text}?
                  </p>
                  <span className='Progress'>
                    <span
                      className='Progress-item  color-bg-success-inverse'
                      style={{ width: `${percentFunc().opt1Percent}%` }}
                    ></span>
                  </span>
                  <p className='text-small mt-1 text-center color-text-secondary mr-2'>
                    {opt1} of {allVotes}
                  </p>
                </div>
                <div
                  className='card  p-2'
                  style={{
                    border: `${
                      activeStyle === 2
                        ? ' 2px dotted var(--color-border-success)'
                        : '0.1px solid  lightgrey'
                    }`
                  }}
                >
                  {activeStyle === 2 && !loading && (
                    <img
                      id='vote-img'
                      width='35px'
                      src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDYwIDYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxzdHlsZT4uYSwuY3tmaWxsOm5vbmU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30uYXtzdHJva2U6IzFjNGRiODtzdHJva2Utd2lkdGg6MS41cHg7fS5ie2ZpbGw6I2U4MmU1Zjt9LmN7c3Ryb2tlOiNlODJlNWY7c3Ryb2tlLXdpZHRoOjIuNXB4O308L3N0eWxlPjwvZGVmcz48dGl0bGUvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMzUuNzQ5LDU4LDM2LjksNDkuNTdhMTYuMTY5LDE2LjE2OSwwLDAsMCw5LjI0MS0xMi4wMjUsMi4zLDIuMywwLDAsMC0yLjI4NC0yLjYzOGgwYTIuMywyLjMsMCwwLDAtMi4yNTQsMS45NSwxMS41MzYsMTEuNTM2LDAsMCwxLTIyLjczOSwwLDIuMywyLjMsMCwwLDAtMi4yNTQtMS45NWgwYTIuMywyLjMsMCwwLDAtMi4yODQsMi42MjksMTYuMTY4LDE2LjE2OCwwLDAsMCw4LjgwNiwxMS44MjNMMjQuMjc1LDU4Ii8+PGxpbmUgY2xhc3M9ImEiIHgxPSIxNS4xOTUiIHgyPSIxMS45MTkiIHkxPSIzNS4zODUiIHkyPSIyNC40NjQiLz48bGluZSBjbGFzcz0iYSIgeDE9IjQ0Ljg5OCIgeDI9IjQ4LjEwNSIgeTE9IjM1LjE1NiIgeTI9IjI0LjQ2NSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNTQuMzM0LDIyLjQ3NWExLjMxNywxLjMxNywwLDAsMS0uODYyLjcxM2MtMi43NTUuNzEzLTE0LjU4MSwzLjY3NS0yMy40NiwzLjY3NVM5LjM0NiwyMy45MDgsNi41NjUsMjMuMTlhMS4zMiwxLjMyLDAsMCwxLS44NzItLjczMUMzLjIyOSwxNy4wNTIsMi4wMjEsMTAuNjQ1LDEuOTUxLDMuMzMyYTEuMzE5LDEuMzE5LDAsMCwxLDEuNjEyLTEuM2MxOC41MjEsNC4yLDM2LjA5NCw0LjE2Miw1Mi44NTEuMDQ2YTEuMzIsMS4zMiwwLDAsMSwxLjYzNSwxLjMwOUM1Ny45LDEwLjQxOCw1Ni45NTIsMTYuOTU2LDU0LjMzNCwyMi40NzVaIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik04LjM5MSw5LjU0NXEuNDIzLjY5Ljc3NywxLjQxN2MuMjM1LjQ3OS40MjQuOTA5LjU3MiwxLjI3Ni4zODMuOTQ5LjcxNCwxLjkxOCwxLjAxLDIuOS4zMTEsMS4wMjkuNiwyLjA3My44MSwzLjEyN2ExLjI2MiwxLjI2MiwwLDAsMCwxLjIwNi45MTgsMS4zMDcsMS4zMDcsMCwwLDAsMS4yMDUtLjkxOGMuMTI1LS4zMTUuMjQxLS42MzUuMzY0LS45NTJxLjItLjUuNC0xYy4wNzItLjE4LjE0NS0uMzU5LjIxOS0uNTM5LjAzOC0uMDk0LjA3Ny0uMTg4LjExNi0uMjgyLjAxNC0uMDMzLjE1OS0uMzc5LjEtLjIzN3MuMDY5LS4xNjEuMDgzLS4yYy4wNS0uMTE2LjEtLjIzMy4xNTEtLjM0OS4wODctLjIuMTc2LS40LjI2NS0uNi4xOTItLjQyNi4zODktLjg1LjYtMS4yN2ExMy40ODUsMTMuNDg1LDAsMCwxLDEuMTQ4LTIuMDA5LDEuMjU5LDEuMjU5LDAsMCwwLS40NDktMS43MSwxLjI3NywxLjI3NywwLDAsMC0xLjcxLjQ0OCwyMy40NzgsMjMuNDc4LDAsMCwwLTIuMzY4LDQuNzIzYy0uNDYyLDEuMS0uODg0LDIuMjA4LTEuMzIzLDMuMzE0aDIuNDExYy0uMjIxLTEuMDkyLS41MTktMi4xNzMtLjg0NC0zLjIzOGEyNi4yMiwyNi4yMiwwLDAsMC0yLjU3OC02LjA3N0ExLjI1LDEuMjUsMCwwLDAsOC4zOTEsOS41NDVaIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik0zNC4xMTMsMTEuMzExYTM1LjUxOSwzNS41MTksMCwwLDAsLjYwNyw4LjkzNCwxLjI2MiwxLjI2MiwwLDAsMCwxLjUzOC44NzMsMS4yNzYsMS4yNzYsMCwwLDAsLjg3My0xLjUzNywzMi44NzYsMzIuODc2LDAsMCwxLS41MTgtOC4yNywxLjI1LDEuMjUsMCwwLDAtMi41LDBaIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik0zMS4yMDUsMTIuMzE5YTI0LjUwOCwyNC41MDgsMCwwLDAsOC4xLS4yMTUsMS4yNTgsMS4yNTgsMCwwLDAsLjg3My0xLjUzOCwxLjI5LDEuMjksMCwwLDAtMS41MzgtLjg3M0wzOC4zLDkuNzRhMS4yNTMsMS4yNTMsMCwwLDAtLjg3MywxLjUzNywxLjI5LDEuMjksMCwwLDAsMS41MzguODczTDM5LjMsMTIuMWwtLjY2NS0yLjQxMWExOS42MjIsMTkuNjIyLDAsMCwxLTMuMzc1LjM3MXEtLjkuMDI3LTEuODA3LS4wMTdjLS4yNzctLjAxNC0uNTUyLS4wMzMtLjgyOC0uMDU3LS4xMzctLjAxMi0uMjc0LS4wMjYtLjQxLS4wNDFsLS4yNzMtLjAzMWMtLjE1Ni0uMDItLjE4MS0uMDIzLS4wNzQtLjAwOWExLjI4NSwxLjI4NSwwLDAsMC0xLjUzNy44NzMsMS4yNjIsMS4yNjIsMCwwLDAsLjg3MywxLjUzN1oiLz48cGF0aCBjbGFzcz0iYiIgZD0iTTQyLjU1NywxMC44NDlxLS4xNDUsMi4zMTMtLjEzMiw0LjYzM2MuMDA1Ljc1NS4wMDgsMS41MTMuMDU1LDIuMjY3YTMuMDA5LDMuMDA5LDAsMCwwLC43MTksMmMxLDEuMDM0LDIuOTYxLjc3MSw0LjIxOS40NkE4LjMyMiw4LjMyMiwwLDAsMCw1MSwxOC4yNThhMS4yNSwxLjI1LDAsMCwwLTEuNzY4LTEuNzY4LDUuNDExLDUuNDExLDAsMCwxLTEuMTU5LjgxLDQuNTY3LDQuNTY3LDAsMCwxLTEuMTkyLjQ2Miw0LjMxMyw0LjMxMywwLDAsMS0xLjM4Ni4xOTFjLS4xMzQsMC0uMjY3LDAtLjQtLjAwOS0uMDkyLDAtLjIzOC0uMDM3LS4yMzEtLjAyLDAsMCwuMTQ3LjExNS4xNjcuMTM4LjA0Ni4wNzQuMDM3LjA1Ny0uMDI4LS4wNTEuMDQ0LjExMS4wNTIuMTI0LjAyNS4wMzdzLS4wNTYtLjI0OC0uMDMtLjA2NmEzLjM3MSwzLjM3MSwwLDAsMS0uMDI0LS4zNDhjLS4wMTYtLjMzMS0uMDI0LS42NjItLjAzMi0uOTkzcS0uMDI0LS45NTItLjAxOS0xLjkuMDA5LTEuOTQ2LjEzMy0zLjg4OGExLjI1NywxLjI1NywwLDAsMC0xLjI1LTEuMjUsMS4yNzksMS4yNzksMCwwLDAtMS4yNSwxLjI1WiIvPjxwYXRoIGNsYXNzPSJiIiBkPSJNNDQuNDM4LDExLjkyOGMuMTMyLS4wNjcuMjY1LS4xMzMuNC0uMi4wNDEtLjAxOS40NjMtLjIuMjIxLS4xcS4zNzQtLjE1NC43NTgtLjI4NWExNC4yMTEsMTQuMjExLDAsMCwxLDEuNzA5LS40N2MuMjcyLS4wNTcuNTQ1LS4xLjgxOS0uMTQ3LjE0OS0uMDIyLjE1Ni0uMDIzLjAxOSwwcS4xMTctLjAxNS4yMzQtLjAyN2MuMTU1LS4wMTYuMzExLS4wMy40NjctLjA0MWExMS40ODMsMTEuNDgzLDAsMCwxLDEuNzEuMDA5LDEuMjU3LDEuMjU3LDAsMCwwLDEuMjUtMS4yNSwxLjI4LDEuMjgsMCwwLDAtMS4yNS0xLjI1LDE0LjU3MiwxNC41NzIsMCwwLDAtNy42LDEuNiwxLjI1OCwxLjI1OCwwLDAsMC0uNDQ4LDEuNzExLDEuMjc5LDEuMjc5LDAsMCwwLDEuNzEuNDQ4WiIvPjxwYXRoIGNsYXNzPSJiIiBkPSJNNDQuMDA1LDE2LjMxMUEyOC40NzMsMjguNDczLDAsMCwwLDQ4Ljk2MSwxNWExLjI1LDEuMjUsMCwwLDAtLjY2NC0yLjQxMUEyOC41ODksMjguNTg5LDAsMCwxLDQzLjM0MSwxMy45YTEuMjQ4LDEuMjQ4LDAsMCwwLS43NDcuNTc0LDEuMjUsMS4yNSwwLDAsMCwxLjQxMSwxLjgzNloiLz48ZWxsaXBzZSBjbGFzcz0iYyIgY3g9IjI0LjI2OSIgY3k9IjE1LjMxMyIgcng9IjQuNzMyIiByeT0iMi45NTEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMzMgMzUuOTUpIHJvdGF0ZSgtNzguMjM4KSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMzQuNDI0LDMzLjg5M2ExLjY1MywxLjY1MywwLDAsMSwxLjY1MywxLjY1M3Y2LjQ2OGMwLDIuNDIyLTIuNjE3LDQuMzg1LTUuODQ2LDQuMzg1cy01Ljg0Ny0xLjk2My01Ljg0Ny00LjM4NVYzNS41NDZhMS42NTMsMS42NTMsMCwwLDEsMS42NTMtMS42NTNaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik0yNC4zODQsNDAuMjgzYzQuNjA1Ljk4NSw4LjM5My0uNTUyLDExLjY5NC0zLjYiLz48L3N2Zz4='
                      alt=''
                    />
                  )}
                  <p className='h5-mktg text-center'>
                    {quest[0].optionTwo.text}?
                  </p>
                  <span className='Progress'>
                    <span
                      className='Progress-item color-bg-success-inverse'
                      style={{ width: `${percentFunc().opt2Percent}%` }}
                    ></span>
                  </span>
                  <p className='text-small mt-1 text-center color-text-secondary mr-2'>
                    {opt2} of {allVotes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  users: state.auth.users,
  theQuest: state.quests.allQuest,
  loading: state.quests.questLoading
});
export default connect(mapStateToProps)(QuestResult);
