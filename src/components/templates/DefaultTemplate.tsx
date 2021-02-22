import React from 'react';
import { format } from 'date-fns';
import { ITemplateProps } from 'models/template';
import { IProject, ISocialLink } from 'models/cv';
import sortProjectsByDate from 'utils/sortProjectsByDate';

function DefaultTemplate({ data, forDownload = false }: ITemplateProps): React.ReactElement {
  return (
    <table
      className="template"
      style={{ width: '100%', maxWidth: '800px',  margin: '0 auto', borderCollapse: 'collapse', fontSize: '16px', lineHeight: '1.5', emptyCells: 'hide', fontFamily: 'Roboto' }}
    >
      <thead>
        <tr style={{ height: '120px' }}>
          <td>
            {/* this img only for the backend to replace src with pic from the server */}
            <img
              src={forDownload ? '${imgAsBase64}' : `${process.env.PUBLIC_URL}/images/logo.svg`}
              style={{ width: '180px', height: '40px' }}
              alt="Logo"
            />
          </td>
        </tr>
        <tr>
          <td
            style={{ fontSize: '30px' }}
            colSpan={2}
          >
            <span style={{ fontWeight: 'bold' }}>Name: </span>
            {data?.firstName} {data?.lastName}
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Position: </span>
            {data?.jobTitle}
          </td>
        </tr>
        {data?.dateOfBirth &&
        <tr>
          <td
            style={{ fontSize: '16px' }}
            colSpan={2}
          >
            <span style={{ fontWeight: 'bold' }}>Birth date: </span>
            {format(new Date(data?.dateOfBirth), 'dd/MM/yyyy')}
          </td>
        </tr>}
        {data?.email &&
          <tr>
            <td
              style={{ fontSize: '16px' }}
              colSpan={2}
            >
              <span style={{ fontWeight: 'bold' }}>email: </span>
              {data?.email}
            </td>
          </tr>}
        {data?.skype &&
          <tr>
            <td
              style={{ fontSize: '16px' }}
              colSpan={2}
            >
              <span style={{ fontWeight: 'bold' }}>skype: </span>
              {data?.skype}
            </td>
          </tr>}
        {data?.phone &&
          <tr>
            <td
              style={{ fontSize: '16px' }}
              colSpan={2}
            >
              <span style={{ fontWeight: 'bold' }}>phone: </span>
              {data?.phone}
            </td>
          </tr>}
        {
            data?.socialLinks.map(({ label, link }: ISocialLink) => (
              <tr key={link}>
                <td
                  style={{ fontSize: '16px' }}
                  colSpan={2}
                >
                  <span style={{ fontWeight: 'bold' }}>{label}: </span>
                  <a href={link}>{link}</a>
                </td>
              </tr>
            ))
          }
      </thead>

      {/* body of resume */}
      <tbody style={{
        backgroundColor: '#f3f9ff',
        borderCollapse: 'separate',
      }}
      >
        <tr style={{ height: '50px' }} />

        {/* summary of qualification */}
        <tr style={{ height: '56px' }}>
          <th
            style={{ textAlign: 'center', fontSize: '25px', backgroundColor: '#d7edf8', border: '2px solid #d0cece' }}
            colSpan={2}
          >Summary of Qualification
          </th>
        </tr>
        <tr>
          <td
            style={{ padding: '15px', border: '2px solid #d0cece' }}
            colSpan={2}
          >
            {data?.professionalSummary}
          </td>
        </tr>

        <tr style={{ height: '50px' }} />

        {/* skills & abilities */}
        <tr style={{ height: '56px', backgroundColor: '#d7edf8' }}>
          <th
            style={{ textAlign: 'center', fontSize: '25px', border: '2px solid #d0cece' }}
            colSpan={2}
          >Skills & Abilities
          </th>
        </tr>

        {/* skills */}
        { (data?.skills && !!data.skills.length) &&
          <tr style={{ height: '56px', border: '2px solid #d0cece' }}>
            <td style={{ width: '25%', padding: '15px', fontSize: '18px', fontWeight: 'bold', border: '2px solid #d0cece', backgroundColor: '#d7edf8' }}>Skills</td>
            <td style={{ padding: '15px', border: '2px solid #d0cece' }}>
              <ul>
                {data?.skills.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </td>
          </tr>}

        {/* programming languages */}
        <tr style={{ height: '56px', border: '2px solid #d0cece' }}>
          <td style={{ width: '25%', padding: '15px', fontSize: '18px', fontWeight: 'bold', border: '2px solid #d0cece', backgroundColor: '#d7edf8' }}>Programming languages</td>
          <td style={{ padding: '15px', border: '2px solid #d0cece' }}>
            <ul>
              {data?.programmingLanguages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </td>
        </tr>

        {/* frameworks/libraries */}
        <tr style={{ height: '56px', border: '2px solid #d0cece' }}>
          <td style={{ padding: '15px', fontSize: '18px', fontWeight: 'bold', border: '2px solid #d0cece', backgroundColor: '#d7edf8' }}>Frameworks/Libraries</td>
          <td style={{ padding: '15px', border: '2px solid #d0cece' }}>
            <ul>
              {data?.frameworksAndLibraries.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </td>
        </tr>

        {/* technologies/databases */}
        <tr style={{ height: '56px', border: '2px solid #d0cece' }}>
          <td style={{ padding: '15px', fontSize: '18px', fontWeight: 'bold', border: '2px solid #d0cece', backgroundColor: '#d7edf8' }}>Technologies/Databases</td>
          <td style={{ padding: '15px', border: '2px solid #d0cece' }}>
            <ul>
              {data?.technologiesAndDatabases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </td>
        </tr>

        {/* VCS */}
        <tr style={{ height: '56px', border: '2px solid #d0cece' }}>
          <td style={{ padding: '15px', fontSize: '18px', fontWeight: 'bold', border: '2px solid #d0cece', backgroundColor: '#d7edf8' }}>Version control system</td>
          <td style={{ padding: '15px', border: '2px solid #d0cece' }}>
            <ul>
              {data?.vcs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </td>
        </tr>

        {/* others */}
        <tr style={{ height: '56px', border: '2px solid #d0cece' }}>
          <td style={{ padding: '15px', fontSize: '18px', fontWeight: 'bold', border: '2px solid #d0cece', backgroundColor: '#d7edf8' }}>Others</td>
          <td style={{ padding: '15px', border: '2px solid #d0cece' }}>
            <ul>
              {data?.others.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </td>
        </tr>

        {/* os */}
        <tr style={{ height: '56px', border: '2px solid #d0cece' }}>
          <td style={{ width: '25%', padding: '15px', fontSize: '18px', fontWeight: 'bold', border: '2px solid #d0cece', backgroundColor: '#d7edf8' }}>OS</td>
          <td style={{ width: '75%', padding: '15px', border: '2px solid #d0cece' }}>
            <ul>
              {data?.os.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </td>
        </tr>

        <tr style={{ height: '50px' }} />

        {/* experience */}
        <tr style={{ height: '56px', backgroundColor: '#d7edf8' }}>
          <th
            style={{ textAlign: 'center', fontSize: '25px', border: '2px solid #d0cece' }}
            colSpan={2}
          >Experience
          </th>
        </tr>

        {
          sortProjectsByDate(data?.projects as IProject[]).map((project: IProject) => (
            <React.Fragment key={project.name}>
              <tr>
                <td style={{ padding: '15px', fontSize: '18px', fontWeight: 'bold', verticalAlign: 'top', border: '2px solid #d0cece', backgroundColor: '#d7edf8' }}>Name</td>
                <td style={{ padding: '15px', border: '2px solid #d0cece', fontWeight: 'bold' }}>{project.name} ({project.country})</td>
              </tr>
              <tr>
                <td style={{ padding: '15px', fontSize: '18px', fontWeight: 'bold', verticalAlign: 'top', border: '2px solid #d0cece', backgroundColor: '#d7edf8' }}>Project Description</td>
                <td style={{ padding: '15px', border: '2px solid #d0cece' }}>{project.projectDescription}</td>
              </tr>
              <tr>
                <td style={{ padding: '15px', fontSize: '18px', fontWeight: 'bold', verticalAlign: 'top', border: '2px solid #d0cece', backgroundColor: '#d7edf8' }}>Position</td>
                <td style={{ padding: '15px', border: '2px solid #d0cece' }}>{project.position}</td>
              </tr>
              <tr>
                <td style={{ padding: '15px', fontSize: '18px', fontWeight: 'bold', verticalAlign: 'top', border: '2px solid #d0cece', backgroundColor: '#d7edf8' }}>Tools & technologies</td>
                <td style={{ padding: '15px', border: '2px solid #d0cece' }}>
                  <ul>
                    {project.tools.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '15px', fontSize: '18px', fontWeight: 'bold', verticalAlign: 'top', border: '2px solid #d0cece', backgroundColor: '#d7edf8' }}>Responsibilities</td>
                <td style={{ padding: '15px', border: '2px solid #d0cece' }}>{project.responsibilities}</td>
              </tr>
              <tr>
                <td style={{ padding: '15px', fontSize: '18px', fontWeight: 'bold', verticalAlign: 'top', border: '2px solid #d0cece', backgroundColor: '#d7edf8' }}>Time Period</td>
                <td style={{ padding: '15px', border: '2px solid #d0cece' }}>
                  {format(new Date(project.projectStartDate), 'LLL, yyyy')} - {format(new Date(project.projectEndDate), 'LLL, yyyy')}
                </td>
              </tr>

              <tr style={{ height: '50px' }} />
            </React.Fragment>
          ))
          }

        {/* Education */}
        <tr style={{ height: '56px', backgroundColor: '#d7edf8' }}>
          <th
            style={{ textAlign: 'center', fontSize: '25px', border: '2px solid #d0cece' }}
            colSpan={2}
          >Education
          </th>
        </tr>

        <tr style={{ height: '56px', border: '2px solid #d0cece' }}>
          <td style={{ padding: '15px', fontSize: '18px', fontWeight: 'bold', border: '2px solid #d0cece', backgroundColor: '#d7edf8' }}>
            <div>Colleges/University/</div>
            <div>Degrees etc.</div>
          </td>
          <td style={{ padding: '15px', border: '2px solid #d0cece' }}>
            {
              data?.education.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {item.school}, {item.degree}
                    <div>
                      {format(new Date(item.educationStartDate), 'yyyy')} - {format(new Date(item.educationEndDate), 'yyyy')}
                    </div>
                  </React.Fragment>
                );
              })
            }
          </td>
        </tr>

        {/* Certifications */}
        {data?.certifications &&
          <>
            <tr style={{ height: '50px' }} />

            <tr style={{ height: '56px', backgroundColor: '#d7edf8' }}>
              <th
                style={{ textAlign: 'center', fontSize: '25px', border: '2px solid #d0cece' }}
                colSpan={2}
              >Certifications
              </th>
            </tr>

            <tr>
              <td
                style={{ padding: '15px', border: '2px solid #d0cece' }}
                colSpan={2}
              >{data.certifications}
              </td>
            </tr>
          </>}

        <tr style={{ height: '50px' }} />

        {/* Languages */}
        <tr style={{ height: '56px', backgroundColor: '#d7edf8' }}>
          <th
            style={{ textAlign: 'center', fontSize: '25px', border: '2px solid #d0cece' }}
            colSpan={2}
          >Languages
          </th>
        </tr>

        {data?.languages.map(({ written, spoken, language }) => (
          <React.Fragment key={language}>
            <tr style={{ height: '56px' }}>
              <td style={{ padding: '15px', fontSize: '18px', fontWeight: 'bold', border: '2px solid #d0cece', backgroundColor: '#d7edf8' }}>
                {language}
              </td>
              <td style={{ padding: '15px', border: '2px solid #d0cece' }}>
                <div><span style={{ fontWeight: 'bold' }}>Spoken:</span> {spoken}</div>
                <div><span style={{ fontWeight: 'bold' }}>Written:</span> {written}</div>
              </td>
            </tr>
          </React.Fragment>
        ))}

        <tr style={{ height: '50px' }} />

        {/* Hobby */}
        {data?.hobby &&
          <>
            <tr style={{ height: '56px', backgroundColor: '#d7edf8' }}>
              <th
                style={{ textAlign: 'center', fontSize: '25px', border: '2px solid #d0cece' }}
                colSpan={2}
              >Hobby
              </th>
            </tr>

            <tr>
              <td
                style={{ padding: '15px', border: '2px solid #d0cece' }}
                colSpan={2}
              >{data.hobby}
              </td>
            </tr>
          </>}
      </tbody>
    </table>
  );
}

export default DefaultTemplate;
