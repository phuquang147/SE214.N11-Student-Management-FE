import { Autocomplete, Box, CircularProgress, Container, Grid, Skeleton, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import TotalClasses from '~/components/Dashboard/TotalClasses';
import TotalStaffs from '~/components/Dashboard/TotalStaffs';
import TotalStudents from '~/components/Dashboard/TotalStudents';
import TotalTeachers from '~/components/Dashboard/TotalTeachers';
import HelmetContainer from '~/HOC/HelmetContainer';
import { inforActions, selectSchoolYears, selectUser } from '~/redux/infor';
import * as commonDataRequest from '~/services/commonDataRequest';
import * as dashboardRequest from '~/services/dashboardRequest';

const _ = require('lodash');

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loaded, setLoaded] = useState(user.hasOwnProperty());
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState(null);
  const [schoolYear, setSchoolYear] = useState(null);
  const [statisticsByYear, setStatisticsByYear] = useState(null);
  const schoolYears = useSelector(selectSchoolYears);

  const token = Cookies.get('token');

  useEffect(() => {
    const getCommonData = async () => {
      if (token) {
        try {
          const { data, status } = await commonDataRequest.getCommonData();
          const { classes, subjects, semesters, grades, user } = data;
          if (status === 200) {
            dispatch(inforActions.setCommonInforSuccess({ classes, subjects, semesters, grades, user }));
            setLoaded(true);
          }
        } catch (err) {
          toast.error('Đã xảy ra lỗi! Vui lòng tải lại trang');
        }
      }
    };

    const getStatistics = async () => {
      try {
        const { data, status } = await dashboardRequest.getStatistics();
        if (status === 200) setStatistics(data.statistic);
      } catch (error) {
        toast.error('Đã xảy ra lỗi! Vui lòng tải lại trang');
      }
    };

    getCommonData();
    getStatistics();
  }, [dispatch, token]);

  useEffect(() => {
    if (schoolYears.length > 0 && !schoolYear) {
      setSchoolYear(schoolYears[0]);
      handleChangeYear(schoolYears[0].value);
    }
  }, [schoolYear, schoolYears]);

  const handleChangeYear = async (year) => {
    setLoading(true);
    try {
      const { data, status } = await dashboardRequest.getStatisticsByYear({ year });
      if (status === 200) {
        const labels = _.map(_.keys(data.statistic['Grade 10']), (key) => {
          switch (key) {
            case 'excellentStudents':
              return 'Xuất sắc';
            case 'goodStudents':
              return 'Giỏi';
            case 'averageStudents':
              return 'Trung bình';
            case 'belowAverageStudents':
              return 'Yếu';
            default:
              return 'Kém';
          }
        });
        setStatisticsByYear({ ...data.statistic, labels });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  if (!loaded) {
    return (
      <>
        <Skeleton variant="rectangular" width="100%" height={80} sx={{ borderRadius: '16px' }} />
        <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: '16px', mt: 2 }} />
      </>
    );
  }

  return (
    <HelmetContainer title="Dashboard | Student Management">
      <Container maxWidth="xl" sx={{ pb: 10 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {statistics ? (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <TotalStudents students={statistics.students} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TotalClasses classes={statistics.classes} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TotalTeachers teachers={statistics.teachers} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TotalStaffs staffs={statistics.staffs} />
              </Grid>
            </>
          ) : null}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
            <Autocomplete
              options={schoolYears}
              sx={{ width: 300 }}
              value={schoolYear}
              onChange={(e, value) => {
                handleChangeYear(value.value);
                setSchoolYear(value);
              }}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => <TextField {...params} label="Năm học" />}
            />
          </Grid>

          {loading ? (
            <Box sx={{ width: '100%', height: '200px', textAlign: 'center', py: 10 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : statisticsByYear ? (
            <>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 2 }}
              >
                <ReactApexChart
                  options={{ labels: statisticsByYear.labels, legend: { position: 'bottom' } }}
                  series={_.values(statisticsByYear['Grade 10'])}
                  type="pie"
                  height={660}
                />
                <Typography sx={{ fontWeight: 'bold' }}>Khối 10</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 2 }}
              >
                <ReactApexChart
                  options={{ labels: statisticsByYear.labels, legend: { position: 'bottom' } }}
                  series={_.values(statisticsByYear['Grade 11'])}
                  type="pie"
                  height={660}
                />
                <Typography sx={{ fontWeight: 'bold' }}>Khối 11</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 2 }}
              >
                <ReactApexChart
                  options={{ labels: statisticsByYear.labels, legend: { position: 'bottom' } }}
                  series={_.values(statisticsByYear['Grade 12'])}
                  type="pie"
                  height={660}
                />
                <Typography sx={{ fontWeight: 'bold' }}>Khối 12</Typography>
              </Grid>
            </>
          ) : null}
        </Grid>
      </Container>
    </HelmetContainer>
  );
}
