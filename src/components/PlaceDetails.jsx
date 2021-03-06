import React from 'react'
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip,makeStyles } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

const styles=makeStyles(() => ({
    chip: {
      margin: '5px 5px 5px 0',
    },
    subtitle: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginTop: '10px',
    },
    spacing: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
}));

export default function PlaceDetails({place,selected,refProp}) {
    const classes=styles();
    if (selected) {
      refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return (
        <Card elevation={6}>
        <CardMedia
          style={{ height: 350 }}
          image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
          title={place.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">{place.name}</Typography>
          <Box display="flex" justifyContent="space-between" my={2}>
            <Rating name="read-only" value={Number(place.rating)} readOnly />
            <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography component="legend">Price</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.price}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography component="legend">Ranking</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.ranking}
            </Typography>
          </Box>
          {place?.awards?.slice(0,3).map((award,index) => (
            <Box key={index} display="flex" justifyContent="space-between" my={1} alignItems="center">
              <img src={award.images.small} />
              <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
            </Box>
          ))}
          {place?.cuisine?.map(({ name }) => (
            <Chip key={name} size="small" label={name} className={classes.chip} />
          ))}
          {place.address && (
            <Box display="flex" justifyContent="flex-start" my={1} alignItems="center">
              <LocationOnIcon />
              <Typography variant="subtitle2" color="textSecondary">{place.address}</Typography>
            </Box>
          )}
          {place.phone && (
            <Box display="flex" justifyContent="flex-start" my={1} alignItems="center">
              <PhoneIcon />
              <Typography variant="subtitle2" color="textSecondary">{place.phone}</Typography>
            </Box>
          )}
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => window.open(place.web_url, '_blank')}>
            Trip Advisor
          </Button>
          <Button size="small" onClick={() => window.open(place.website, '_blank')}>
            Website
          </Button>
        </CardActions>
      </Card>
    )
}
